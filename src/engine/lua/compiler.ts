// Lua 5.2 → JavaScript compiler for the game's scripts.
// The output keeps Lua evaluation order (it drives the RNG sequence) and calls into the
// runtime for every operation whose semantics differ from JavaScript.
import luaparse from 'luaparse';

type Node = any; // luaparse AST nodes are loosely typed; shapes are checked by `type`.

const RUNTIME_NAMES = [
  'first',
  'nth',
  'mret',
  'mretv',
  'va',
  'truthy',
  'index',
  'setindex',
  'call',
  'callv',
  'method',
  'methodv',
  'add',
  'sub',
  'mul',
  'div',
  'mod',
  'pow',
  'unm',
  'concat',
  'len',
  'eq',
  'lt',
  'le',
  'gt',
  'ge',
  'newTable',
  'forNum',
  'forIter',
  'gget',
  'gset',
  'LuaError',
] as const;

interface Scope {
  vars: Map<string, string>;
  parent: Scope | undefined;
  fn: FnState;
}

interface LabelInfo {
  js: string;
  kind: 'forward' | 'backward';
}

interface FnState {
  temps: number;
  hasVararg: boolean;
  labels: Map<string, LabelInfo>[];
  loopLabels: string[];
}

export interface CompileOptions {
  /** Shown in errors and in the generated header. */
  chunkName: string;
}

let uid = 0;
const nextId = () => ++uid;

function sanitize(name: string): string {
  return name.replace(/[^A-Za-z0-9_]/g, '_');
}

export function parseLua(source: string): Node {
  return luaparse.parse(source, {
    luaVersion: '5.2',
    encodingMode: 'pseudo-latin1',
    comments: false,
    locations: true,
    ranges: false,
    scope: false,
  } as any);
}

export class Compiler {
  constructor(private readonly opts: CompileOptions) {}

  compileChunk(source: string): string {
    const ast = parseLua(source);
    const fn: FnState = { temps: 0, hasVararg: true, labels: [], loopLabels: [] };
    const scope: Scope = { vars: new Map(), parent: undefined, fn };
    const body = this.block(ast.body, scope);
    const temps = this.tempDecl(fn);
    return `function(...$va) {\n${temps}${body}\n}`;
  }

  private tempDecl(fn: FnState): string {
    if (fn.temps === 0) return '';
    const names: string[] = [];
    for (let i = 1; i <= fn.temps; i++) names.push(`$t${i}`);
    return `let ${names.join(', ')};\n`;
  }

  private temp(scope: Scope): string {
    return `$t${++scope.fn.temps}`;
  }

  private declare(scope: Scope, name: string): string {
    const js = `${sanitize(name)}$${nextId()}`;
    scope.vars.set(name, js);
    return js;
  }

  private lookup(scope: Scope | undefined, name: string): string | undefined {
    for (let s = scope; s; s = s.parent) {
      const v = s.vars.get(name);
      if (v !== undefined) return v;
    }
    return undefined;
  }

  // ------------------------------------------------------------------ statements

  private block(stmts: Node[], parentScope: Scope, newScope = true): string {
    const scope: Scope = newScope ? { vars: new Map(), parent: parentScope, fn: parentScope.fn } : parentScope;
    // goto support: find labels in this block and the statements that jump to them
    const labelPositions = new Map<string, number>();
    stmts.forEach((s, i) => {
      if (s.type === 'LabelStatement') labelPositions.set(s.label.name, i);
    });
    const frame = new Map<string, LabelInfo>();
    const wrapStart = new Map<number, { label: string; kind: 'forward' | 'backward' }[]>();
    const wrapEnd = new Map<number, { label: string; kind: 'forward' | 'backward' }[]>();
    for (const [name, li] of labelPositions) {
      let firstFwd = -1;
      let hasBackward = false;
      stmts.forEach((s, i) => {
        if (containsGoto(s, name)) {
          if (i < li && firstFwd === -1) firstFwd = i;
          if (i > li) hasBackward = true;
        }
      });
      const js = `$L_${sanitize(name)}_${nextId()}`;
      if (firstFwd !== -1 && hasBackward) throw new Error(`${this.opts.chunkName}: label '${name}' used both forward and backward`);
      if (firstFwd !== -1) {
        frame.set(name, { js, kind: 'forward' });
        push(wrapStart, firstFwd, { label: js, kind: 'forward' });
        push(wrapEnd, li, { label: js, kind: 'forward' });
      } else if (hasBackward) {
        frame.set(name, { js, kind: 'backward' });
        push(wrapStart, li + 1, { label: js, kind: 'backward' });
        push(wrapEnd, stmts.length, { label: js, kind: 'backward' });
      }
    }
    scope.fn.labels.push(frame);
    const lines: string[] = [];
    for (let i = 0; i <= stmts.length; i++) {
      // closers first: a forward region ends right before its label
      for (const w of (wrapEnd.get(i) ?? []).slice().reverse()) {
        lines.push(w.kind === 'forward' ? `}` : `break; }`);
      }
      for (const w of wrapStart.get(i) ?? []) {
        lines.push(w.kind === 'forward' ? `${w.label}: {` : `${w.label}: while (true) {`);
      }
      if (i < stmts.length) lines.push(this.statement(stmts[i], scope));
    }
    scope.fn.labels.pop();
    return lines.join('\n');
  }

  private statement(s: Node, scope: Scope): string {
    const line = s.loc ? `/*${s.loc.start.line}*/` : '';
    switch (s.type) {
      case 'LocalStatement':
        return line + this.localStatement(s, scope);
      case 'AssignmentStatement':
        return line + this.assignment(s, scope);
      case 'CallStatement':
        return `${line + this.callExpr(s.expression, scope, true)};`;
      case 'FunctionDeclaration':
        return line + this.functionDeclaration(s, scope);
      case 'ReturnStatement':
        return line + this.returnStatement(s, scope);
      case 'IfStatement':
        return line + this.ifStatement(s, scope);
      case 'WhileStatement': {
        const lbl = `$loop${nextId()}`;
        scope.fn.loopLabels.push(lbl);
        const body = this.block(s.body, scope);
        scope.fn.loopLabels.pop();
        return `${line}${lbl}: while (truthy(${this.expr(s.condition, scope)})) {\n${body}\n}`;
      }
      case 'RepeatStatement': {
        const lbl = `$loop${nextId()}`;
        scope.fn.loopLabels.push(lbl);
        const inner: Scope = { vars: new Map(), parent: scope, fn: scope.fn };
        const body = this.block(s.body, inner, false);
        const cond = this.expr(s.condition, inner);
        scope.fn.loopLabels.pop();
        return `${line}${lbl}: while (true) {\n${body}\nif (truthy(${cond})) break;\n}`;
      }
      case 'DoStatement':
        return `{\n${this.block(s.body, scope)}\n}`;
      case 'ForNumericStatement':
        return line + this.forNumeric(s, scope);
      case 'ForGenericStatement':
        return line + this.forGeneric(s, scope);
      case 'BreakStatement': {
        const lbl = scope.fn.loopLabels[scope.fn.loopLabels.length - 1];
        if (!lbl) throw new Error(`${this.opts.chunkName}: break outside loop`);
        return `break ${lbl};`;
      }
      case 'GotoStatement': {
        const name = s.label.name;
        for (let i = scope.fn.labels.length - 1; i >= 0; i--) {
          const info = scope.fn.labels[i].get(name);
          if (info) return info.kind === 'forward' ? `break ${info.js};` : `continue ${info.js};`;
        }
        throw new Error(`${this.opts.chunkName}: no visible label '${name}' for goto`);
      }
      case 'LabelStatement':
        return '';
      default:
        throw new Error(`${this.opts.chunkName}: unsupported statement ${s.type}`);
    }
  }

  private localStatement(s: Node, scope: Scope): string {
    const names: string[] = s.variables.map((v: Node) => v.name);
    const inits: Node[] = s.init;
    // values are evaluated before the new locals come into scope
    if (inits.length === 0) {
      const js = names.map((n) => this.declare(scope, n));
      return `let ${js.join(', ')};`;
    }
    const lastIsMulti = isMulti(inits[inits.length - 1]);
    if (names.length === 1 && inits.length === 1) {
      const v = this.expr(inits[0], scope);
      return `let ${this.declare(scope, names[0])} = ${v};`;
    }
    if (!lastIsMulti || inits.length > names.length) {
      const vals = inits.map((e, i) => (i === inits.length - 1 && i >= names.length ? this.multiExpr(e, scope) : this.expr(e, scope)));
      const tmps = vals.map(() => this.temp(scope));
      const pre = vals.map((v, i) => `${tmps[i]} = ${v};`).join(' ');
      const js = names.map((n) => this.declare(scope, n));
      return `${pre}\nlet ${js.map((j, i) => `${j} = ${i < tmps.length ? tmps[i] : 'undefined'}`).join(', ')};`;
    }
    // last init is a multi-value expression that fills the remaining names
    const fixed = inits.slice(0, -1).map((e) => this.expr(e, scope));
    const tmps = fixed.map(() => this.temp(scope));
    const mt = this.temp(scope);
    const pre = `${fixed.map((v, i) => `${tmps[i]} = ${v};`).join(' ')} ${mt} = ${this.multiExpr(inits[inits.length - 1], scope)};`;
    const js = names.map((n) => this.declare(scope, n));
    const assigns = js.map((j, i) => (i < fixed.length ? `${j} = ${tmps[i]}` : `${j} = nth(${mt}, ${i - fixed.length})`));
    return `${pre}\nlet ${assigns.join(', ')};`;
  }

  private assignTarget(target: Node, scope: Scope): { prep: string[]; store: (v: string) => string } {
    if (target.type === 'Identifier') {
      const local = this.lookup(scope, target.name);
      if (local) return { prep: [], store: (v) => `${local} = ${v};` };
      const name = JSON.stringify(target.name);
      return { prep: [], store: (v) => `gset(${name}, ${v});` };
    }
    if (target.type === 'MemberExpression') {
      const o = this.temp(scope);
      return {
        prep: [`${o} = ${this.expr(target.base, scope)};`],
        store: (v) => `setindex(${o}, ${JSON.stringify(target.identifier.name)}, ${v});`,
      };
    }
    if (target.type === 'IndexExpression') {
      const o = this.temp(scope);
      const k = this.temp(scope);
      return {
        prep: [`${o} = ${this.expr(target.base, scope)};`, `${k} = ${this.expr(target.index, scope)};`],
        store: (v) => `setindex(${o}, ${k}, ${v});`,
      };
    }
    throw new Error(`${this.opts.chunkName}: bad assignment target ${target.type}`);
  }

  private assignment(s: Node, scope: Scope): string {
    const targets: Node[] = s.variables;
    const inits: Node[] = s.init;
    if (targets.length === 1 && inits.length === 1) {
      const t = targets[0];
      if (t.type === 'Identifier') {
        const local = this.lookup(scope, t.name);
        const v = this.expr(inits[0], scope);
        return local ? `${local} = ${v};` : `gset(${JSON.stringify(t.name)}, ${v});`;
      }
      if (t.type === 'MemberExpression') {
        return `setindex(${this.expr(t.base, scope)}, ${JSON.stringify(t.identifier.name)}, ${this.expr(inits[0], scope)});`;
      }
      if (t.type === 'IndexExpression') {
        return `setindex(${this.expr(t.base, scope)}, ${this.expr(t.index, scope)}, ${this.expr(inits[0], scope)});`;
      }
    }
    const tgts = targets.map((t) => this.assignTarget(t, scope));
    const lines: string[] = [];
    for (const t of tgts) lines.push(...t.prep);
    const vals: string[] = [];
    const lastIsMulti = isMulti(inits[inits.length - 1]);
    inits.forEach((e, i) => {
      const tmp = this.temp(scope);
      const isLast = i === inits.length - 1;
      lines.push(`${tmp} = ${isLast && lastIsMulti ? this.multiExpr(e, scope) : this.expr(e, scope)};`);
      vals.push(tmp);
    });
    const valueFor = (i: number): string => {
      if (i < inits.length - 1) return vals[i];
      if (lastIsMulti) return `nth(${vals[inits.length - 1]}, ${i - (inits.length - 1)})`;
      if (i === inits.length - 1) return vals[i];
      return 'undefined';
    };
    for (let i = tgts.length - 1; i >= 0; i--) lines.push(tgts[i].store(valueFor(i)));
    return lines.join(' ');
  }

  private functionDeclaration(s: Node, scope: Scope): string {
    if (s.isLocal) {
      const js = this.declare(scope, s.identifier.name);
      return `let ${js}; ${js} = ${this.functionExpr(s, scope, false)};`;
    }
    const id = s.identifier;
    if (id.type === 'Identifier') {
      const local = this.lookup(scope, id.name);
      const f = this.functionExpr(s, scope, false);
      return local ? `${local} = ${f};` : `gset(${JSON.stringify(id.name)}, ${f});`;
    }
    if (id.type === 'MemberExpression') {
      const isMethod = id.indexer === ':';
      return `setindex(${this.expr(id.base, scope)}, ${JSON.stringify(id.identifier.name)}, ${this.functionExpr(s, scope, isMethod)});`;
    }
    throw new Error(`${this.opts.chunkName}: bad function name`);
  }

  private returnStatement(s: Node, scope: Scope): string {
    const args: Node[] = s.arguments;
    if (args.length === 0) return 'return undefined;';
    if (args.length === 1) {
      return `return ${isMulti(args[0]) ? this.multiExpr(args[0], scope) : this.expr(args[0], scope)};`;
    }
    const last = args[args.length - 1];
    if (isMulti(last)) {
      const fixed = args.slice(0, -1).map((a) => this.expr(a, scope));
      return `return mretv([${fixed.join(', ')}], ${this.multiExpr(last, scope)});`;
    }
    return `return mret(${args.map((a) => this.expr(a, scope)).join(', ')});`;
  }

  private ifStatement(s: Node, scope: Scope): string {
    let out = '';
    s.clauses.forEach((c: Node, i: number) => {
      if (c.type === 'IfClause') out += `if (truthy(${this.expr(c.condition, scope)})) {\n${this.block(c.body, scope)}\n}`;
      else if (c.type === 'ElseifClause') out += ` else if (truthy(${this.expr(c.condition, scope)})) {\n${this.block(c.body, scope)}\n}`;
      else out += ` else {\n${this.block(c.body, scope)}\n}`;
      void i;
    });
    return out;
  }

  private forNumeric(s: Node, scope: Scope): string {
    const v = this.temp(scope);
    const lim = this.temp(scope);
    const step = this.temp(scope);
    const init = `${v} = forNum(${this.expr(s.start, scope)}, 'initial'); ${lim} = forNum(${this.expr(s.end, scope)}, 'limit'); ${step} = forNum(${
      s.step ? this.expr(s.step, scope) : '1'
    }, 'step'); ${v} = ${v} - ${step};`;
    const lbl = `$loop${nextId()}`;
    const inner: Scope = { vars: new Map(), parent: scope, fn: scope.fn };
    const iv = this.declare(inner, s.variable.name);
    scope.fn.loopLabels.push(lbl);
    const body = this.block(s.body, inner);
    scope.fn.loopLabels.pop();
    return `${init}\n${lbl}: while (true) {\n${v} += ${step};\nif (${step} > 0 ? !(${v} <= ${lim}) : !(${lim} <= ${v})) break;\nlet ${iv} = ${v};\n${body}\n}`;
  }

  private forGeneric(s: Node, scope: Scope): string {
    const f = this.temp(scope);
    const st = this.temp(scope);
    const ctl = this.temp(scope);
    const r = this.temp(scope);
    const its: Node[] = s.iterators;
    let init: string;
    if (its.length === 1 && isMulti(its[0])) {
      const m = this.temp(scope);
      init = `${m} = ${this.multiExpr(its[0], scope)}; ${f} = nth(${m}, 0); ${st} = nth(${m}, 1); ${ctl} = nth(${m}, 2);`;
    } else {
      const vals = its.map((e, i) => (i === its.length - 1 && isMulti(e) ? this.multiExpr(e, scope) : this.expr(e, scope)));
      const tmps = vals.map(() => this.temp(scope));
      init = vals.map((v, i) => `${tmps[i]} = ${v};`).join(' ');
      const at = (i: number) => {
        if (i < its.length - 1) return tmps[i];
        const lastIdx = its.length - 1;
        if (isMulti(its[lastIdx])) return `nth(${tmps[lastIdx]}, ${i - lastIdx})`;
        return i === lastIdx ? tmps[i] : 'undefined';
      };
      init += ` ${f} = ${at(0)}; ${st} = ${at(1)}; ${ctl} = ${at(2)};`;
    }
    const lbl = `$loop${nextId()}`;
    const inner: Scope = { vars: new Map(), parent: scope, fn: scope.fn };
    const names: string[] = s.variables.map((v: Node) => this.declare(inner, v.name));
    scope.fn.loopLabels.push(lbl);
    const body = this.block(s.body, inner);
    scope.fn.loopLabels.pop();
    const binds = names.map((n, i) => `let ${n} = ${r}[${i}];`).join(' ');
    return `${init}\n${lbl}: while (true) {\n${r} = forIter(${f}, ${st}, ${ctl});\nif (${r} === undefined || ${r}[0] === undefined) break;\n${ctl} = ${r}[0];\n${binds}\n${body}\n}`;
  }

  // ------------------------------------------------------------------ expressions

  private functionExpr(f: Node, scope: Scope, isMethod: boolean): string {
    const fn: FnState = { temps: 0, hasVararg: false, labels: [], loopLabels: [] };
    const inner: Scope = { vars: new Map(), parent: scope, fn };
    const params: string[] = [];
    if (isMethod) params.push(this.declare(inner, 'self'));
    for (const p of f.parameters) {
      if (p.type === 'VarargLiteral') {
        fn.hasVararg = true;
        params.push('...$va');
      } else params.push(this.declare(inner, p.name));
    }
    const body = this.block(f.body, inner, false);
    return `(function(${params.join(', ')}) {\n${this.tempDecl(fn)}${body}\n})`;
  }

  /** Expression in single-value context. */
  expr(e: Node, scope: Scope): string {
    switch (e.type) {
      case 'NilLiteral':
        return 'undefined';
      case 'BooleanLiteral':
        return e.value ? 'true' : 'false';
      case 'NumericLiteral':
        return numberLiteral(e.value);
      case 'StringLiteral':
        return JSON.stringify(e.value);
      case 'VarargLiteral':
        return '$va[0]';
      case 'Identifier': {
        const local = this.lookup(scope, e.name);
        return local ?? `gget(${JSON.stringify(e.name)})`;
      }
      case 'FunctionDeclaration':
        return this.functionExpr(e, scope, false);
      case 'TableConstructorExpression':
        return this.tableConstructor(e, scope);
      case 'MemberExpression':
        if (e.indexer !== '.') throw new Error(`${this.opts.chunkName}: method reference without call`);
        return `index(${this.expr(e.base, scope)}, ${JSON.stringify(e.identifier.name)})`;
      case 'IndexExpression':
        return `index(${this.expr(e.base, scope)}, ${this.expr(e.index, scope)})`;
      case 'CallExpression':
      case 'TableCallExpression':
      case 'StringCallExpression':
        return `first(${this.callExpr(e, scope, false)})`;
      case 'UnaryExpression':
        return this.unary(e, scope);
      case 'BinaryExpression':
        return this.binary(e, scope);
      case 'LogicalExpression': {
        const t = this.temp(scope);
        const a = this.expr(e.left, scope);
        const b = this.expr(e.right, scope);
        if (e.operator === 'and') return `((${t} = ${a}) === undefined || ${t} === false ? ${t} : ${b})`;
        return `((${t} = ${a}) === undefined || ${t} === false ? ${b} : ${t})`;
      }
      default:
        throw new Error(`${this.opts.chunkName}: unsupported expression ${e.type}`);
    }
  }

  /** Expression whose value may carry several results (a call or `...`). */
  private multiExpr(e: Node, scope: Scope): string {
    if (e.type === 'VarargLiteral') return 'va($va)';
    if (e.type === 'CallExpression' || e.type === 'TableCallExpression' || e.type === 'StringCallExpression')
      return this.callExpr(e, scope, false);
    return this.expr(e, scope);
  }

  private args(e: Node): Node[] {
    if (e.type === 'CallExpression') return e.arguments;
    if (e.type === 'TableCallExpression') return [e.arguments];
    if (e.type === 'StringCallExpression') return [e.argument];
    return [];
  }

  private callExpr(e: Node, scope: Scope, _statement: boolean): string {
    const args = this.args(e);
    const base = e.base;
    const last = args[args.length - 1];
    const multiTail = last !== undefined && isMulti(last);
    const fixed = (multiTail ? args.slice(0, -1) : args).map((a) => this.expr(a, scope));
    if (base.type === 'MemberExpression' && base.indexer === ':') {
      const obj = this.expr(base.base, scope);
      const name = JSON.stringify(base.identifier.name);
      if (multiTail) return `methodv(${obj}, ${name}, [${fixed.join(', ')}], ${this.multiExpr(last, scope)})`;
      return `method(${[obj, name, ...fixed].join(', ')})`;
    }
    const f = this.expr(base, scope);
    if (multiTail) return `callv(${f}, [${fixed.join(', ')}], ${this.multiExpr(last, scope)})`;
    return `call(${[f, ...fixed].join(', ')})`;
  }

  private unary(e: Node, scope: Scope): string {
    const a = e.argument;
    switch (e.operator) {
      case '-':
        if (a.type === 'NumericLiteral') return numberLiteral(-a.value);
        return `unm(${this.expr(a, scope)})`;
      case 'not': {
        const t = this.temp(scope);
        return `((${t} = ${this.expr(a, scope)}) === undefined || ${t} === false)`;
      }
      case '#':
        return `len(${this.expr(a, scope)})`;
      default:
        throw new Error(`${this.opts.chunkName}: unsupported unary ${e.operator}`);
    }
  }

  private binary(e: Node, scope: Scope): string {
    const a = this.expr(e.left, scope);
    const b = this.expr(e.right, scope);
    const fn: Record<string, string> = {
      '+': 'add',
      '-': 'sub',
      '*': 'mul',
      '/': 'div',
      '%': 'mod',
      '^': 'pow',
      '..': 'concat',
      '==': 'eq',
      '<': 'lt',
      '<=': 'le',
      '>': 'gt',
      '>=': 'ge',
    };
    if (e.operator === '~=') return `!eq(${a}, ${b})`;
    const f = fn[e.operator];
    if (!f) throw new Error(`${this.opts.chunkName}: unsupported operator ${e.operator}`);
    return `${f}(${a}, ${b})`;
  }

  private tableConstructor(e: Node, scope: Scope): string {
    const fields: Node[] = e.fields;
    if (fields.length === 0) return 'newTable(0, 0, undefined)';
    const ops: string[] = [];
    let na = 0;
    let nh = 0;
    let tail = '';
    fields.forEach((f, i) => {
      const isLast = i === fields.length - 1;
      if (f.type === 'TableValue') {
        if (isLast && isMulti(f.value)) {
          tail = this.multiExpr(f.value, scope);
        } else {
          na++;
          ops.push(`0, ${this.expr(f.value, scope)}`);
        }
      } else if (f.type === 'TableKeyString') {
        nh++;
        ops.push(`1, ${JSON.stringify(f.key.name)}, ${this.expr(f.value, scope)}`);
      } else {
        nh++;
        ops.push(`1, ${this.expr(f.key, scope)}, ${this.expr(f.value, scope)}`);
      }
    });
    return `newTable(${na}, ${nh}, [${ops.join(', ')}]${tail ? `, ${tail}, true` : ''})`;
  }
}

function push<K, V>(m: Map<K, V[]>, k: K, v: V) {
  const a = m.get(k);
  if (a) a.push(v);
  else m.set(k, [v]);
}

function isMulti(e: Node | undefined): boolean {
  return (
    e !== undefined &&
    (e.type === 'CallExpression' || e.type === 'TableCallExpression' || e.type === 'StringCallExpression' || e.type === 'VarargLiteral')
  );
}

function numberLiteral(v: number): string {
  if (v === Infinity) return 'Infinity';
  if (v === -Infinity) return '-Infinity';
  if (Object.is(v, -0)) return '-0';
  return v < 0 ? `(${String(v)})` : String(v);
}

/** Does `node` contain `goto name` outside nested functions? */
function containsGoto(node: Node, name: string): boolean {
  let found = false;
  const visit = (n: Node) => {
    if (found || n === null || typeof n !== 'object') return;
    if (Array.isArray(n)) {
      for (const x of n) visit(x);
      return;
    }
    // labels never cross a function boundary
    if (n.type === 'FunctionDeclaration') return;
    if (n.type === 'GotoStatement' && n.label.name === name) {
      found = true;
      return;
    }
    for (const k of Object.keys(n)) {
      if (k === 'loc') continue;
      visit(n[k]);
    }
  };
  visit(node);
  return found;
}

export const runtimeImportNames = RUNTIME_NAMES;
