/**
 * 活动类型
 */
export class ActivityTypeDto {

    name;

    /**
     * 活动开启条件
     * @type {Array<ActivityOpenType>}
     */
    openConditions;

    /**
     * 活动开启时间类型
     * @type {ActivityOpenTimeType}
     */
    openTimeTypes;

    /**
     * 是否重置
     * @type {boolean}
     */
    reset;

    /**
     * 重置类型
     * @type {ActivityResetType}
     */
    resetType;

    /**
     * 重置参数
     * @type {ResetOptionDto|string}
     */
    resetOption;

    /**
     * 活动持续时间
     */
    durationType;

    /**
     * 关闭时间
     */
    closeType;

    /**
     * 生效时间
     */
    activeType;

    /**
     * 功能配置
     */
    functionConfig;

    /**
     * data = {name, openCondition, openTimeType, openTime, reset, resetType, resetOption}
     * @param {*} data 
     */
    constructor(data = {}) {
        Object.assign(this, data);
    }

}

/**
 * 活动开启条件
 */
export class ActivityOpenType {
    
    static SERVER_START_TIME = 'SERVER_START_TIME'; // 开服时间
    static LVL = 'LVL'; // 等级
    static ZHANDOULI = 'ZHANDOULI'; // 战斗力
    static ZHUXIAN_ID = 'ZHUXIAN_ID'; // 主线任务ID
    static CHAPTER_ID = 'CHAPTER_ID'; // 章节ID
    static GUANQIA_ID = 'GUANQIA_ID'; // 关卡ID
    static CAMPAIGN_ID = 'CAMPAIGN_ID'; // 活动ID
    static XIULIAN_COUNT = 'XIULIAN_COUNT'; // 修炼塔层数
    static CHOUKA_COUNT = 'CHOUKA_COUNT'; // 抽卡次数
    static ACTIVE_ROLE_ID = 'ACTIVE_ROLE_ID'; // 激活角色ID
    static ROLE_COUNT = 'ROLE_COUNT'; // 拥有角色数量
    static VIP_LVL = 'VIP_LVL'; // VIP等级

}

/**
 * 活动开启时间类型
 */
export class ActivityOpenTimeType {

    static DATE = 'DATE'; // 指定日期
    static WEEK = 'WEEK'; // 指定星期
    static MONTH = 'MONTH'; // 指定月份
    static SERVER = 'SERVER'; // 服务器开启时间
    static HEFU = 'HEFU'; // 合服时间
    static CREATE_ROLE = 'CREATE_ROLE'; // 创建角色时间

}

/**
 * 活动重置条件
 */
export class ActivityResetType {

    static TIME = 'TIME'; // 按时间
    static BEHAVIOR = 'BEHAVIOR'; // 按用户行为

}

/**
 * 按时间重置参数
 */
export class ResetOptionByTimeDto {

    /**
     * 类型
     */
    type;

    /**
     * 
     */
    day;

}

/**
 * 按用户行为重置参数
 */
export class ResetOptionByBehaviorDto {
    /**
     * 类型
     */
    type;
}

/**
 * 功能配置参数
 */
export class FunctionConfigDto {

    /**
     * 领取条件
     */
    collectCondition;

    /**
     * 领取方式
     */
    collectChannel;

}