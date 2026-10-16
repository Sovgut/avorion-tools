-- Dumps rows GT_FROM..GT_TO of the running server's galaxy to moddata/verify-galaxy.tsv.
-- GT_FROM, GT_TO, GT_RESET and GT_BOSSES (the world boss count) are prepended by the verify tool.
package.path = package.path .. ";data/scripts/lib/?.lua;data/scripts/?.lua"

local SectorSpecifics = include("sectorspecifics")
local FactoryPredictor = include("factorypredictor")
local seed = GameSeed()
local specs = SectorSpecifics()

local function serializeContents(c)
    if not c then return "" end
    local keys = {}
    for k, v in pairs(c) do
        if type(v) == "number" or type(v) == "boolean" or type(v) == "string" then keys[#keys + 1] = k end
    end
    table.sort(keys)
    local parts = {}
    for _, k in ipairs(keys) do parts[#parts + 1] = k .. "=" .. tostring(c[k]) end
    return table.concat(parts, ",")
end

local function productionIndices(list)
    local parts = {}
    for _, p in ipairs(list) do parts[#parts + 1] = tostring(p.index) end
    return table.concat(parts, ";")
end

local out = io.open("moddata/verify-galaxy.tsv", GT_RESET and "w" or "a")
for y = GT_FROM, GT_TO do
    for x = -499, 500 do
        specs:initialize(x, y, seed)
        if specs.regular or specs.offgrid or specs.blocked then
            local script = specs:getScript()
            local contentsStr, prodStr, extraStr = "", "", ""
            if (specs.regular or specs.offgrid) and specs.generationTemplate and specs.generationTemplate.contents then
                local ok, contents, random = pcall(specs.generationTemplate.contents, x, y)
                if ok and contents then
                    if specs.regular then
                        contentsStr = serializeContents(contents)
                        local pf, pm = "", ""
                        if (contents.factories or 0) > 0 then pf = productionIndices(FactoryPredictor.generateFactoryProductions(x, y, contents.factories)) end
                        if (contents.mines or 0) > 0 then pm = productionIndices(FactoryPredictor.generateMineProductions(x, y, contents.mines)) end
                        prodStr = pf .. "|" .. pm
                    end
                    -- the boss pick generate() makes, from the same Random
                    local boss = ""
                    if script == "sectors/worldboss" and random then boss = tostring(random:getInt(1, GT_BOSSES)) end
                    extraStr = string.format("%d;%d;%s", contents.resourceAsteroids or 0, contents.claimableAsteroids or 0, boss)
                end
            end
            out:write(string.format("%d\t%d\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n",
                x, y,
                specs.regular and "R" or (specs.offgrid and "O" or "B"),
                tostring(specs.factionIndex),
                script,
                specs.name,
                tostring(specs.gates),
                tostring(specs.generationSeed),
                contentsStr,
                prodStr,
                extraStr))
        end
    end
end
out:close()
print("VERIFY ROWS DONE " .. GT_TO)
