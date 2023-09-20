import {ComponentType} from "~constants/enums/components";
import {TurretType} from "~constants/enums/turrets";
import {SellerType} from "~constants/enums/sellers";
import {IntlComponent, IntlSeller, IntlTurret, IntlUI} from "~contexts/intl/storage/types";

const UI: IntlUI = {
    "copy": "Скопировать",
    "copied": "Скопировано!",
    "lets-add-turret": "Давайте добавим ваш первый рецепт в планировщик турелей!",
    "cargo-offset": "Наличие в трюме",
    "guaranteed-in": "Гарантировано содержится в",
    "threats": "Угрозы",
    "can-be-found-in": "Может содержаться в",
    "quantity": "Количество",
    "component": "Компонент",
    "components": "Компоненты",
    "estimated-price": "Ожидаемая цена",
    "estimated-volume": "Ожидаемый объем",
    "estimated-price-info": "Цена за все компоненты на основе базовой цены каждого компонента и максимально возможной",
    "component-source-info": "\"Фабрика турелей\", \"Поставщик фабрики турелей\" и \"Торговая фактория\" может содержать любой из компонентов",
    "dangerous-cargo": "Опасный груз",
    "illegal-cargo": "Нелегальный груз",
    "please-note": "Обратите внимание",
    "cargo-required": "Требуемые компоненты",
    "cargo": "Трюм",
    "cargo-field-note": "Всякий раз, когда изменяется количество компонента, значение трюма автоматически сбрасывается на начальное состояние.",
    "cargo-field-label": "Добавить",
    "select-turret": "Выберите турель...",
    "add-turret": "Добавить турель",
    "remove-turret": "Удалить",
    "reset-components": "Сбросить",
    "clear-turrets": "Очистить турели",
    "turret-price": "Цена",
    "clear-turrets-confirmation": "Вы уверены, что хотите очистить список турелей?",
    "remove-turret-confirmation": "Вы уверены, что хотите удалить турель из списка?",
    "recipe-for-version": "Рецепт для:",
    "theme": "Тема",
    "light-theme": "Светлая",
    "dark-theme": "Темная",
    "system-theme": "Системная",
    "language": "Язык",
    "english-language": "Английский",
    "russian-language": "Русский",
    "getting-started-0": "Добро пожаловать, командир 👋",
    "getting-started-1": "Новый рецепт турели",
    "getting-started-2": "Готовы модернизировать систему обороны вашего корабля Avorion, но не хотите считать компоненты в Excel? Вы не одиноки. Вот почему вам стоит попробовать использовать это приложение. Планировщик турелей поможет вам в процессе создания новой турели на Фабрике турелей! Он не только предоставит детальные рецепты для построения турели, но и предложит подробный обзор компонентов, используемых в рецепте. Вам достаточно указать количество ресурсов, необходимых для вашей новой турели, и количество турелей.",
    "getting-started-3": "Оценки",
    "getting-started-4": "Чтобы гарантировать, что вы останетесь в рамках бюджета, приложение рассчитает ориентировочную стоимость ваших предполагаемых турелей. Кроме того, для обеспечения идеальной загрузки грузового отсека, оно также предоставит оценку объема.",
    "turret-planner": "Планировщик турелей",
};

const COMPONENT: IntlComponent = {
    [ComponentType.Servo]: "Сервомеханизм",
    [ComponentType.SteelTube]: "Стальная труба",
    [ComponentType.AmmunitionS]: "Боеприпасы S",
    [ComponentType.Steel]: "Сталь",
    [ComponentType.Aluminum]: "Алюминий",
    [ComponentType.Lead]: "Свинец",
    [ComponentType.IndustrialTeslaCoil]: "Промышленный трансформатор Тесла",
    [ComponentType.ElectromagneticCharge]: "Электромагнитный заряд",
    [ComponentType.EnergyInverter]: "Инвертор энергии",
    [ComponentType.Conductor]: "Проводник",
    [ComponentType.PowerUnit]: "Силовая установка",
    [ComponentType.Copper]: "Медь",
    [ComponentType.EnergyCell]: "Энергетический элемент",
    [ComponentType.LaserCompressor]: "Лазерный компрессор",
    [ComponentType.LaserModulator]: "Лазерный модулятор",
    [ComponentType.HighCapacityLens]: "Линза для мощного лазера",
    [ComponentType.Rocket]: "Ракета",
    [ComponentType.HighPressureTube]: "Труба высокого давления",
    [ComponentType.Fuel]: "Топливо",
    [ComponentType.TargetingCard]: "Карта наведения",
    [ComponentType.Wire]: "Провод",
    [ComponentType.Nanobot]: "Наноробот",
    [ComponentType.Transformator]: "Трансформатор",
    [ComponentType.Gold]: "Золото",
    [ComponentType.ElectroMagnet]: "Электромагнит",
    [ComponentType.GaussRail]: "Рельсовая пушка Гаусса",
    [ComponentType.LaserHead]: "Лазерная головка",
    [ComponentType.Crystal]: "Кристалл",
    [ComponentType.PlasmaCell]: "Плазменный элемент",
    [ComponentType.EnergyTube]: "Энергетическая труба",
    [ComponentType.EnergyContainer]: "Аккумулятор",
    [ComponentType.MilitaryTeslaCoil]: "Военный трансформатор Тесла",
    [ComponentType.ForceGenerator]: "Генератор силового поля",
    [ComponentType.Zinc]: "Цинк",
    [ComponentType.Warhead]: "Боеголовка",
    [ComponentType.ExplosiveCharge]: "Заряд взрывчатого вещества",
    [ComponentType.AmmunitionM]: "Боеприпасы M",
};

const TURRET: IntlTurret = {
    [TurretType.Chaingun]: "Автоматическая пушка",
    [TurretType.PointDefenseCannon]: "Автоматическая пушка прикрытия",
    [TurretType.PointDefenseLaser]: "Лазер прикрытия",
    [TurretType.Laser]: "Лазер",
    [TurretType.MiningLaser]: "Рудный лазер",
    [TurretType.RawMiningLaser]: "Груборудный лазер",
    [TurretType.SalvagingLaser]: "Утилизационный лазер",
    [TurretType.RawSalvagingLaser]: "Лазер для грубой утилизации",
    [TurretType.PlasmaGun]: "Плазменная пушка",
    [TurretType.RocketLauncher]: "Ракетная установка",
    [TurretType.Cannon]: "Орудие",
    [TurretType.Railgun]: "Рельсовая пушка",
    [TurretType.Repair]: "Ремонт",
    [TurretType.Bolter]: "Болтер",
    [TurretType.LightningGun]: "Молниевая пушка",
    [TurretType.TeslaGun]: "Пушка Тесла",
    [TurretType.ForceGun]: "Силовая пушка",
    [TurretType.PulseCannon]: "Импульсное орудие",
    [TurretType.AntiFighter]: "Против истребителей",
};

const SELLER: IntlSeller = {
    [SellerType.TurretFactory]: "Фабрика турелей",
    [SellerType.TurretFactorySupplier]: "Поставщик фабрики турелей",
    [SellerType.PlanetaryTradingPost]: "Планетарная торговая фактория",
    [SellerType.SolarPowerPlant]: "Солнечная электростанция",
    [SellerType.WireManufacturer]: "Производитель Провод",
    [SellerType.CrystalFarm]: "Ферма (Кристалл)",
    [SellerType.NobleMetalMine]: "Рудник благородного металла",
    [SellerType.AluminumMine]: "Алюминий шахта",
    [SellerType.CopperMine]: "Медь шахта",
    [SellerType.LeadMine]: "Свинец шахта",
    [SellerType.ZincMine]: "Цинк шихта",
    [SellerType.ComputerComponentFactory]: "Фабрика компьютерных комплектующих",
    [SellerType.AmmunitionFactory]: "Фабрика боеприпасов",
    [SellerType.TeslaCoilFactory]: "Фабрика трансформаторов Тесла",
    [SellerType.ConductorFactory]: "Фабрика Проводник",
    [SellerType.ElectroMagnetFactory]: "Фабрика Электромагнит",
    [SellerType.ElectromagneticChargeFactory]: "Фабрика Электромагнитный заряд",
    [SellerType.EnergyContainerFactory]: "Фабрика Аккумулятор",
    [SellerType.EnergyInverterFactory]: "Фабрика Инвертор энергии",
    [SellerType.EnergyTubeFactory]: "Фабрика Энергетическая труба",
    [SellerType.ExplosiveChargeFactory]: "Фабрика Заряд взрывчатого вещества",
    [SellerType.ForceGeneratorFactory]: "Фабрика Генератор силового поля",
    [SellerType.FuelFactory]: "Фабрика Топливо",
    [SellerType.GaussRailFactory]: "Фабрика Рельсовая пушка Гаусса",
    [SellerType.HighCapacityLensFactory]: "Фабрика Линза для мощного лазера",
    [SellerType.HighPressureTubeFactory]: "Фабрика Труба высокого давления",
    [SellerType.LaserCompressorFactory]: "Фабрика Лазерный компрессор",
    [SellerType.LaserHeadFactory]: "Фабрика Лазерная головка",
    [SellerType.LaserModulatorFactory]: "Фабрика Лазерный модулятор",
    [SellerType.NanobotFactory]: "Фабрика Наноробот",
    [SellerType.PlasmaCellFactory]: "Фабрика Плазменный элемент",
    [SellerType.PowerUnitFactory]: "Фабрика Силовая установка",
    [SellerType.RocketFactory]: "Фабрика Ракета",
    [SellerType.ServoFactory]: "Фабрика Сервомеханизм",
    [SellerType.SteelFactory]: "Фабрика Сталь",
    [SellerType.SteelTubeFactory]: "Фабрика Стальная труба",
    [SellerType.TargetingCardFactory]: "Фабрика Карта наведения",
    [SellerType.TransformatorFactory]: "Фабрика Трансформатор",
    [SellerType.WarheadFactory]: "Фабрика Боеголовка",
};

export const Russian = {UI, TURRET, COMPONENT, SELLER};
