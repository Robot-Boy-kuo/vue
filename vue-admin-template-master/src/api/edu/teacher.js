import request from '@/utils/request'

export default {
    //1. 讲师列表（条件查询分页）
    //current分页当前页，limit每页记录数，teacherQuery条件对象
    getTeacherListPage(current, limit, teacherQuery) {
        return request({
            //url: '/table/list' + current + "/" + limit,
            url:`/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据，使用json传递数据
            //data表示把对象转换成json传递到接口里面
            data: teacherQuery
        })
    },
    //删除讲师
    deleteTeacherId(id) {
        return request({
            url: `/eduservice/teacher/${id}`,
            method: 'delete',
            
        })
    },
    //添加讲师
    addTeacher(teacher) {
        return request({
            url: `/eduservice/teacher/addTeadcher`,
            method: 'post',
            data:teacher
        })
    }

}