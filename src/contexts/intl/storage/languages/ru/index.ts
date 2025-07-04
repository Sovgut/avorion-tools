import { Commodity } from "~data/commodities/enums";
import { Station } from "~data/stations/enums";
import { Turret } from "~data/turrets/enums";
import {
  IntlCommodity,
  IntlStation,
  IntlTurret,
  IntlUI,
} from "~contexts/intl/storage/types";

const UI: IntlUI = {
  "blueprint-add": "Добавить рецепт турели",
  "blueprint-add-title": "Добавить рецепт турели",
  "blueprint-add-name": "Название рецепта",
  "blueprint-add-name-required": "Название рецепта обязательно",
  "blueprint-add-rarity-required": "Редкость рецепта обязательна",
  "blueprint-add-submit": "Добавить рецепт",
  "blueprint-list": "Список рецептов турелей",
  "blueprint-list-title": "Список рецептов турелей",
  "rarity-legendary": "Легендарный",
  "rarity-exotic": "Экзотический",
  "rarity-exceptional": "Исключительный",
  "rarity-rare": "Редкий",
  "rarity-uncommon": "Необычный",
  "rarity-common": "Обычный",
  "rarity-petty": "Незначительный",
  "upgrade-cost": "Стоимость улучшения",
  "consumables": "Расходные материалы",
  "position-x": "X",
  "position-y": "Y",
  "count": "Количество",
  produced: "Произведено",
  required: "Требуется",
  "result-optional-hint": "Этот результат является необязательным.",
  results: "Результаты",
  "ingredient-optional-hint": "Этот ингредиент является необязательным.",
  ingredients: "Ингредиенты",
  info: "Информация",
  "roi-cycles-hint": "Количество циклов до окупаемости первоначальных затрат.",
  "roi-cycles": "Циклов окупаемости",
  "required-cargo-hint": "Оптимальная производственная мощность фабрики",
  "required-cargo": "Необходимый груз",
  "profit-hint": "Добавление сборочных блоков на фабрики уменьшает время, необходимое для выполнения одного производственного цикла, до минимума в 15 секунд. Когда игрок находится не в том же секторе, что и фабрика, обновления происходят реже. В некоторых случаях это может означать, что фактическое время для выполнения цикла при отсутствии игрока может увеличиться до почти 5 секунд.",
  cycle: "Цикл",
  profit: "Прибыль",
  cost: "Стоимость",
  copy: "Скопировать",
  "copy-location": "Скопировать местоположение",
  copied: "Скопировано!",
  "lets-add-turret": "Давайте добавим ваш первый рецепт в планировщик турелей!",
  "cargo-offset": "Наличие в трюме",
  "guaranteed-in": "Гарантировано содержится в",
  threats: "Угрозы",
  "can-be-found-in": "Может содержаться в",
  quantity: "Количество",
  component: "Компонент",
  components: "Компоненты",
  "estimated-price": "Примерная цена",
  "estimated-volume": "Объем",
  "estimated-price-info":
    "Цена за все компоненты на основе базовой цены каждого компонента и максимально возможной",
  "component-source-info":
    '"Фабрика турелей", "Поставщик фабрики турелей" и "Торговая фактория" может содержать любой из компонентов',
  "dangerous-cargo": "Опасный груз",
  "illegal-cargo": "Нелегальный груз",
  "please-note": "Обратите внимание",
  "cargo-required": "Требуемые компоненты",
  cargo: "Трюм",
  "cargo-field-note":
    "Всякий раз, когда изменяется количество компонента, значение трюма автоматически сбрасывается на начальное состояние.",
  "cargo-field-label": "Добавить",
  "select-turret": "Выберите турель...",
  "add-turret": "Добавить турель",
  "remove-turret": "Удалить",
  "reset-components": "Сбросить",
  "clear-turrets": "Очистить турели",
  "turret-price": "Цена",
  "clear-turrets-confirmation":
    "Вы уверены, что хотите очистить список турелей?",
  "remove-turret-confirmation":
    "Вы уверены, что хотите удалить турель из списка?",
  "recipe-for-version": "Рецепт для:",
  theme: "Тема",
  "light-theme": "Светлая",
  "dark-theme": "Темная",
  "system-theme": "Системная",
  language: "Язык",
  "english-language": "Английский",
  "russian-language": "Русский",
  "getting-started-0": "Добро пожаловать, командир 👋",
  "getting-started-1": "Новый рецепт турели",
  "getting-started-2":
    "Готовы модернизировать систему обороны вашего корабля Avorion, но не хотите считать компоненты в Excel? Вы не одиноки. Вот почему вам стоит попробовать использовать это приложение. Планировщик турелей поможет вам в процессе создания новой турели на Фабрике турелей! Он не только предоставит детальные рецепты для построения турели, но и предложит подробный обзор компонентов, используемых в рецепте. Вам достаточно указать количество ресурсов, необходимых для вашей новой турели, и количество турелей.",
  "getting-started-3": "Оценки",
  "getting-started-4":
    "Чтобы гарантировать, что вы останетесь в рамках бюджета, приложение рассчитает ориентировочную стоимость ваших предполагаемых турелей. Кроме того, для обеспечения идеальной загрузки грузового отсека, оно также предоставит оценку объема.",
  "turret-planner": "Планировщик турелей",
  "global-search": "Глобальный поиск",
  commodity: "Товар",
  commodities: "Товары",
  station: "Станция",
  stations: "Станции",
};

const COMMODITY: IntlCommodity = {
  [Commodity.Servo]: "Сервомеханизм",
  [Commodity.SteelTube]: "Стальная труба",
  [Commodity.AmmunitionS]: "Боеприпасы S",
  [Commodity.Steel]: "Сталь",
  [Commodity.Aluminum]: "Алюминий",
  [Commodity.Lead]: "Свинец",
  [Commodity.IndustrialTeslaCoil]: "Промышленный трансформатор Тесла",
  [Commodity.ElectromagneticCharge]: "Электромагнитный заряд",
  [Commodity.EnergyInverter]: "Инвертор энергии",
  [Commodity.Conductor]: "Проводник",
  [Commodity.PowerUnit]: "Силовая установка",
  [Commodity.Copper]: "Медь",
  [Commodity.EnergyCell]: "Энергетический элемент",
  [Commodity.LaserCompressor]: "Лазерный компрессор",
  [Commodity.LaserModulator]: "Лазерный модулятор",
  [Commodity.HighCapacityLens]: "Линза для мощного лазера",
  [Commodity.Rocket]: "Ракета",
  [Commodity.HighPressureTube]: "Труба высокого давления",
  [Commodity.Fuel]: "Топливо",
  [Commodity.TargetingCard]: "Карта наведения",
  [Commodity.Wire]: "Провод",
  [Commodity.Nanobot]: "Наноробот",
  [Commodity.Transformator]: "Трансформатор",
  [Commodity.Gold]: "Золото",
  [Commodity.ElectroMagnet]: "Электромагнит",
  [Commodity.GaussRail]: "Рельсовая пушка Гаусса",
  [Commodity.LaserHead]: "Лазерная головка",
  [Commodity.Crystal]: "Кристалл",
  [Commodity.PlasmaCell]: "Плазменный элемент",
  [Commodity.EnergyTube]: "Энергетическая труба",
  [Commodity.EnergyContainer]: "Аккумулятор",
  [Commodity.MilitaryTeslaCoil]: "Военный трансформатор Тесла",
  [Commodity.ForceGenerator]: "Генератор силового поля",
  [Commodity.Zinc]: "Цинк",
  [Commodity.Warhead]: "Боеголовка",
  [Commodity.ExplosiveCharge]: "Заряд взрывчатого вещества",
  [Commodity.AmmunitionM]: "Боеприпасы M",
  [Commodity.Adhesive]: "Адгезив",
  [Commodity.Ammunition]: "Боеприпасы",
  [Commodity.AmmunitionL]: "Боеприпасы L",
  [Commodity.AntigravGenerator]: "Антигравитационный генератор",
  [Commodity.AvorionOre]: "Аворионовая руда",
  [Commodity.Beer]: "Пиво",
  [Commodity.BioGas]: "Биогаз",
  [Commodity.BodyArmor]: "Доспех",
  [Commodity.Book]: "Книга",
  [Commodity.Carbon]: "Углеволокно",
  [Commodity.Cattle]: "Крупный рогатый скот",
  [Commodity.Chemicals]: "Химикаты",
  [Commodity.Chlorine]: "Хлор",
  [Commodity.Clothes]: "Одежда",
  [Commodity.Coal]: "Уголь",
  [Commodity.Cocoa]: "Какао",
  [Commodity.Coffee]: "Кофе",
  [Commodity.ComputationMainframe]: "Мейнфрейм",
  [Commodity.Coolant]: "Охлаждающая жидкость",
  [Commodity.Corn]: "Кукуруза",
  [Commodity.Dairy]: "Молочные продукты",
  [Commodity.Diamond]: "Алмаз",
  [Commodity.Display]: "Экран",
  [Commodity.Drill]: "Бур",
  [Commodity.Drone]: "Дрон",
  [Commodity.ElectronAccelerator]: "Ускоритель электронов",
  [Commodity.EnergyGenerator]: "Энергетический генератор",
  [Commodity.Fabric]: "Ткань",
  [Commodity.Fertilizer]: "Удобрение",
  [Commodity.Fish]: "Рыба",
  [Commodity.Fluorine]: "Фтор",
  [Commodity.Food]: "Еда",
  [Commodity.FoodBar]: "Пищевой батончик",
  [Commodity.Fruit]: "Фрукт",
  [Commodity.Fungus]: "Гриб",
  [Commodity.AntigravUnit]: "Антигравитационная установка",
  [Commodity.AcronDrug]: "Препарат «Акрон»",
  [Commodity.Acid]: "Кислота",
  [Commodity.FusionCore]: "Термоядерное ядро",
  [Commodity.FusionGenerator]: "Термоядерный генератор",
  [Commodity.Gem]: "Самоцвет",
  [Commodity.Glass]: "Стекло",
  [Commodity.Gun]: "Ствол",
  [Commodity.Helium]: "Гелий",
  [Commodity.Hydrogen]: "Водород",
  [Commodity.IronOre]: "Железная руда",
  [Commodity.Jewelry]: "Украшения",
  [Commodity.Leather]: "Кожа",
  [Commodity.Liquor]: "Крепкое спиртное",
  [Commodity.LuxuryFood]: "Дорогая еда",
  [Commodity.Meat]: "Мясо",
  [Commodity.MedicalSupplies]: "Медицинские принадлежности",
  [Commodity.MetalPlate]: "Металлическая пластина",
  [Commodity.Microchip]: "Микросхема",
  [Commodity.Mineral]: "Минерал",
  [Commodity.MiningRobot]: "Добывающий робот",
  [Commodity.MornDrug]: "Препарат «Морн»",
  [Commodity.NaoniteOre]: "Наонитовая руда",
  [Commodity.Neon]: "Неон",
  [Commodity.NeutronAccelerator]: "Ускоритель нейтронов",
  [Commodity.Nitrogen]: "Азот",
  [Commodity.OgoniteOre]: "Огонитовая руда",
  [Commodity.Oil]: "Нефть",
  [Commodity.Ore]: "Руда",
  [Commodity.Oxygen]: "Кислород",
  [Commodity.Paint]: "Краска",
  [Commodity.Paper]: "Бумага",
  [Commodity.Plankton]: "Планктон",
  [Commodity.Plant]: "Растение",
  [Commodity.Plastic]: "Пластмасса",
  [Commodity.Platinum]: "Платина",
  [Commodity.Potato]: "Картофель",
  [Commodity.Processor]: "Процессор",
  [Commodity.Protein]: "Протеин",
  [Commodity.ProtonAccelerator]: "Ускоритель протонов",
  [Commodity.RawOil]: "Сырая нефть",
  [Commodity.Rice]: "Рис",
  [Commodity.RiftAvorionOre]: "Аворионовая руда из разлома",
  [Commodity.RiftIronOre]: "Железная руда из разлома",
  [Commodity.RiftNaoniteOre]: "Наонитовая руда из разлома",
  [Commodity.RiftOgoniteOre]: "Огонитовая руда из разлома",
  [Commodity.RiftResearchData]: "Данные исследования разломов",
  [Commodity.RiftTitaniumOre]: "Титановая руда из разлома",
  [Commodity.RiftTriniumOre]: "Триниевая руда из разлома",
  [Commodity.RiftXanionOre]: "Ксанионовая руда из разлома",
  [Commodity.Rubber]: "Резина",
  [Commodity.Satellite]: "Спутник",
  [Commodity.ScrapAvorion]: "Лом авориона",
  [Commodity.ScrapIron]: "Железный лом",
  [Commodity.ScrapMetal]: "Металлолом",
  [Commodity.ScrapNaonite]: "Лом наонита",
  [Commodity.ScrapOgonite]: "Лом огонита",
  [Commodity.ScrapTitanium]: "Лом титана",
  [Commodity.ScrapTrinium]: "Лом триния",
  [Commodity.ScrapXanion]: "Лом ксаниона",
  [Commodity.SemiConductor]: "Полупроводник",
  [Commodity.Sheep]: "Овцы",
  [Commodity.Silicon]: "Кремний",
  [Commodity.Silver]: "Серебро",
  [Commodity.Slave]: "Раб",
  [Commodity.SolarCell]: "Фотоэлемент",
  [Commodity.SolarPanel]: "Солнечная панель",
  [Commodity.Solvent]: "Растворитель",
  [Commodity.Spices]: "Специи",
  [Commodity.TargetingSystem]: "Система наведения",
  [Commodity.Tea]: "Чай",
  [Commodity.Teleporter]: "Телепорт",
  [Commodity.TitaniumOre]: "Титановая руда",
  [Commodity.Tools]: "Инструменты",
  [Commodity.ToxicWaste]: "Токсичные отходы",
  [Commodity.TriniumOre]: "Триниевая руда",
  [Commodity.Turbine]: "Турбина",
  [Commodity.Vegetable]: "Овощ",
  [Commodity.Vehicle]: "Сухопутный транспорт",
  [Commodity.WarRobot]: "Боевой робот",
  [Commodity.Water]: "Вода",
  [Commodity.Wheat]: "Пшеница",
  [Commodity.Wine]: "Вино",
  [Commodity.Wood]: "Дерево",
  [Commodity.XanionOre]: "Ксанионовая руда",
};

const TURRET: IntlTurret = {
  [Turret.Chaingun]: "Автоматическая пушка",
  [Turret.PointDefenseCannon]: "Автоматическая пушка прикрытия",
  [Turret.PointDefenseLaser]: "Лазер прикрытия",
  [Turret.Laser]: "Лазер",
  [Turret.MiningLaser]: "Рудный лазер",
  [Turret.RawMiningLaser]: "Груборудный лазер",
  [Turret.SalvagingLaser]: "Утилизационный лазер",
  [Turret.RawSalvagingLaser]: "Лазер для грубой утилизации",
  [Turret.PlasmaGun]: "Плазменная пушка",
  [Turret.RocketLauncher]: "Ракетная установка",
  [Turret.Cannon]: "Орудие",
  [Turret.Railgun]: "Рельсовая пушка",
  [Turret.Repair]: "Ремонт",
  [Turret.Bolter]: "Болтер",
  [Turret.LightningGun]: "Молниевая пушка",
  [Turret.TeslaGun]: "Пушка Тесла",
  [Turret.ForceGun]: "Силовая пушка",
  [Turret.PulseCannon]: "Импульсное орудие",
  [Turret.AntiFighter]: "Против истребителей",
};

const STATION: IntlStation = {
  [Station.Biotope]: "Биотоп",
  [Station.Casino]: "Казино",
  [Station.Habitat]: "Жилой комплекс",
  [Station.EquipmentDock]: "Склад снаряжения",
  [Station.Shipyard]: "Судоверфь",
  [Station.RepairDock]: "Ремонтный док",
  [Station.MilitaryOutpost]: "Военный аванпост",
  [Station.ResearchStation]: "Исследовательская станция",
  [Station.RiftResearchStation]: "Исследовательская станция разлома",
  [Station.TravelHub]: "Транспортный узел",
  [Station.TurretFactory]: "Фабрика турелей",
  [Station.TurretFactorySupplier]: "Поставщик фабрики турелей",
  [Station.PlanetaryTradingPost]: "Планетарная торговая фактория",
  [Station.SolarPowerPlant]: "Солнечная электростанция",
  [Station.WireManufacturer]: "Производитель Провод",
  [Station.CrystalFarm]: "Ферма (Кристалл)",
  [Station.NobleMetalMine]: "Рудник благородного металла",
  [Station.AluminumMine]: "Алюминий шахта",
  [Station.CopperMine]: "Медь шахта",
  [Station.LeadMine]: "Свинец шахта",
  [Station.ZincMine]: "Цинк шахта",
  [Station.ComputerComponentFactory]: "Фабрика компьютерных комплектующих",
  [Station.AmmunitionFactory]: "Фабрика боеприпасов",
  [Station.TeslaCoilFactory]: "Фабрика трансформаторов Тесла",
  [Station.ConductorFactory]: "Фабрика Проводник",
  [Station.ElectroMagnetFactory]: "Фабрика Электромагнит",
  [Station.ElectromagneticChargeFactory]: "Фабрика Электромагнитный заряд",
  [Station.EnergyContainerFactory]: "Фабрика Аккумулятор",
  [Station.EnergyInverterFactory]: "Фабрика Инвертор энергии",
  [Station.EnergyTubeFactory]: "Фабрика Энергетическая труба",
  [Station.ExplosiveChargeFactory]: "Фабрика Заряд взрывчатого вещества",
  [Station.ForceGeneratorFactory]: "Фабрика Генератор силового поля",
  [Station.FuelFactory]: "Фабрика Топливо",
  [Station.GaussRailFactory]: "Фабрика Рельсовая пушка Гаусса",
  [Station.HighCapacityLensFactory]: "Фабрика Линза для мощного лазера",
  [Station.HighPressureTubeFactory]: "Фабрика Труба высокого давления",
  [Station.LaserCompressorFactory]: "Фабрика Лазерный компрессор",
  [Station.LaserHeadFactory]: "Фабрика Лазерная головка",
  [Station.LaserModulatorFactory]: "Фабрика Лазерный модулятор",
  [Station.NanobotFactory]: "Фабрика Наноробот",
  [Station.PlasmaCellFactory]: "Фабрика Плазменный элемент",
  [Station.PowerUnitFactory]: "Фабрика Силовая установка",
  [Station.RocketFactory]: "Фабрика Ракета",
  [Station.ServoFactory]: "Фабрика Сервомеханизм",
  [Station.SteelFactory]: "Фабрика Сталь",
  [Station.SteelTubeFactory]: "Фабрика Стальная труба",
  [Station.TargetingCardFactory]: "Фабрика Карта наведения",
  [Station.TransformatorFactory]: "Фабрика Трансформатор",
  [Station.WarheadFactory]: "Фабрика Боеголовка",
  [Station.AcceleratorFactory]: "Фабрика ускорителей",
  [Station.AntigravGeneratorFactory]: "Фабрика Антигравитационный генератор",
  [Station.AntigravUnitFactory]: "Фабрика Антигравитационная установка",
  [Station.BodyArmorFactory]: "Фабрика Доспех",
  [Station.BookFactory]: "Фабрика Книга",
  [Station.Brewery]: "Пивоварня",
  [Station.CarbonExtractor]: "Экстрактор Углеволокно",
  [Station.CattleRanch]: "Ферма крупного рогатого скота",
  [Station.ChemicalFactory]: "Химический завод",
  [Station.ClothesFactory]: "Фабрика Одежда",
  [Station.CoalMine]: "Уголь шахта",
  [Station.CocoaFarm]: "Ферма (Какао)",
  [Station.CoffeeFarm]: "Ферма (Кофе)",
  [Station.ComputationMainframeFactory]: "Фабрика Мейнфрейм",
  [Station.CornFarm]: "Ферма (Кукуруза)",
  [Station.DairyFarm]: "Молочная ферма",
  [Station.DisplayFactory]: "Фабрика Экран",
  [Station.Distillery]: "Спиртовой завод",
  [Station.DrillFactory]: "Фабрика Бур",
  [Station.DroneFactory]: "Фабрика Дрон",
  [Station.EnergyGeneratorFactory]: "Фабрика Энергетический генератор",
  [Station.FabricFactory]: "Фабрика Ткань",
  [Station.FertilizerFactory]: "Фабрика Удобрение",
  [Station.FishFarm]: "Рыбная ферма",
  [Station.FoodBarFactory]: "Фабрика Пищевой батончик",
  [Station.FoodFactory]: "Фабрика Еда",
  [Station.FruitFarm]: "Ферма (Фрукт)",
  [Station.FungusFarm]: "Ферма (Гриб)",
  [Station.FusionCoreFactory]: "Фабрика Термоядерное ядро",
  [Station.FusionGeneratorFactory]: "Фабрика Термоядерный генератор",
  [Station.GasCollector]: "Газовый собиратель",
  [Station.GunFactory]: "Фабрика Ствол",
  [Station.Hideout]: "Укрытие контрабандистов",
  [Station.IceMine]: "Ледяная шахта",
  [Station.JewelryManufacturer]: "Производитель Украшения",
  [Station.LuxuryFoodFactory]: "Фабрика Дорогая еда",
  [Station.MeatFactory]: "Фабрика Мясная фабрика",
  [Station.MedicalSuppliesFactory]: "Фабрика Медицинские принадлежности",
  [Station.MetalPlateFactory]: "Фабрика Металлическая пластина",
  [Station.MicrochipFactory]: "Фабрика Микросхема",
  [Station.MineralExtractor]: "Экстрактор Минерал",
  [Station.MiningRobotFactory]: "Фабрика Добывающий робот",
  [Station.OilRefinery]: "Очиститель Нефть",
  [Station.OilRig]: "Нефтяная платформа",
  [Station.OreMine]: "Руда шахта",
  [Station.PaintManufacturer]: "Производитель Краска",
  [Station.PaperFactory]: "Фабрика Бумага",
  [Station.PlanktonCollector]: "Собиратель Планктон",
  [Station.PlantFarm]: "Ферма (Растение)",
  [Station.PlasticManufacturer]: "Производитель Пластмасса",
  [Station.PotatoFarm]: "Ферма (Картофель)",
  [Station.ProcessorFactory]: "Фабрика Процессор",
  [Station.ProteinFactory]: "Фабрика Протеин",
  [Station.RiceFarm]: "Ферма (Рис)",
  [Station.Rift]: "Разлом",
  [Station.RubberFactory]: "Фабрика Резина",
  [Station.SatelliteFactory]: "Фабрика Спутник",
  [Station.ScrapMetalTrader]: "Торговец Металлолом",
  [Station.Sector]: "Сектор",
  [Station.SemiConductorManufacturer]: "Производитель Полупроводник",
  [Station.SheepRanch]: "Овцеводческая ферма",
  [Station.SiliconMine]: "Кремний шахта",
  [Station.SolarCellFactory]: "Фабрика Фотоэлемент",
  [Station.SolarPanelFactory]: "Фабрика Солнечная панель",
  [Station.SpicesFarm]: "Ферма (Специи)",
  [Station.TargetingSystemFactory]: "Фабрика Система наведения",
  [Station.TeaFarm]: "Ферма (Чай)",
  [Station.TeleporterFactory]: "Фабрика Телепорт",
  [Station.ToolsFactory]: "Фабрика Инструменты",
  [Station.TurbineFactory]: "Фабрика Турбина",
  [Station.VegetableFarm]: "Ферма (Овощ)",
  [Station.VehicleFactory]: "Фабрика Сухопутный транспорт",
  [Station.WarRobotFactory]: "Фабрика Боевой робот",
  [Station.WaterCollector]: "Собиратель Вода",
  [Station.WheatFarm]: "Ферма (Пшеница)",
  [Station.WineFactory]: "Фабрика Вино",
  [Station.WoodFarm]: "Ферма (Дерево)",
  [Station.GlassManufacturer]: "Производитель Стекло",
};

export const Russian = { UI, TURRET, COMMODITY, STATION };
