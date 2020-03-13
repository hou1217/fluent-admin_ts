import instance from './request'
import {ActivityTypeDto} from './dto/ActivityTypeDto'

const PATH_ACTIVITY_TYPE_LIST = '/operation-app/campaign/type/list';
const PATH_ACTIVITY_TYPE_DETAIL = '/operation-app/campaign/type/detail';
const PATH_ACTIVITY_TYPE_CREATE = '/operation-app/campaign/type/create';
const PATH_ACTIVITY_TYPE_EDIT = '/operation-app/campaign/type/edit';
const PATH_ACTIVITY_TYPE_DELETE = '/operation-app/campaign/type/delete';
const PATH_ACTIVITY_TYPE_ACTIVATE = '/operation-app/campaign/type/activate';

export class ActivityTypeApi {

    /**
     * 活动类型列表
     * @param {Object} searchForm
     * @param {number} searchForm.page
     * @param {number} searchForm.pageSize
     * @param {name} searchForm.name 类型名称
     * @param {string} searchForm.state 状态
     * @param {string} searchForm.sort 排序字段
     * @param {string} searchForm.direction 排序方式
     * @return {Promise<Array>}
     */
    static activityTypeList(searchForm: object) : Promise<any>{
        console.log('[activityTypeApi]: activityTypeList');
        console.log(searchForm);
        return instance.post(PATH_ACTIVITY_TYPE_LIST, searchForm);
    }

    /**
     * 活动类型详情
     * @param {stirng} typeId
     * @return {Promise<Array>}
     */
    static activityTypeDetail(typeId: string):  Promise<any>{
        return instance.post(PATH_ACTIVITY_TYPE_DETAIL, {typeId});
        // return new Promise((resolve, reject) => {
        //     resolve({
        //         typeId: 't001',
        //         name: '类型1',
        //         templateCount: 1,
        //         state: 'ACTIVE'
        //     });
        // });
    }

    /**
     * 改变状态
     * @param {Array} typeIds 活动类型id数组
     * @param {TypeState} state 活动类型状态
     */
    static activityTypeActivate(typeIds: string[], state: string):  Promise<any>{
        return instance.post(PATH_ACTIVITY_TYPE_ACTIVATE, {typeIds, state});
        // return new Promise((resolve, reject) => {
        //     resolve();
        // });
    }

    /**
     * 删除
     * @param {Array} typeIds 活动类型id数组
     */
    static activityTypeDelete(typeIds: string[]):  Promise<any>{
        return instance.post(PATH_ACTIVITY_TYPE_DELETE, {typeIds});
        // return new Promise((resolve, reject) => {
        //     resolve();
        // });
    }

    /**
     * 新建
     * @param {*} activityTypeForm 活动类型参数
     */
    static activityTypeCreate(activityTypeForm: object): Promise<any>{
        return instance.post(PATH_ACTIVITY_TYPE_CREATE, activityTypeForm);
    }

     /**
      * 编辑
      * @param {*} activityTypeForm 活动类型参数
      */
     static activityTypeEdit(activityTypeForm: object): Promise<any>{
         return instance.post(PATH_ACTIVITY_TYPE_EDIT, activityTypeForm);
     }
}

/**
 * 活动类型状态
 */
export class TypeState {

    static ACTIVE = 'ACTIVE';
    static INACTIVE = 'INACTIVE';

}