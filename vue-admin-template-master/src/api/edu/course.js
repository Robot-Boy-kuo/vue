import request from '@/utils/request'

export default {
    //1. 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/edu-course/addCourceInfo`,
            method: 'post',
            data: courseInfo
        })
    },

    //2.查询所有讲师
    getListTeacher() { 
        return request({
            url: `/eduservice/teacher/findAll`,
            method: 'get',
        })
    },

    //3.根据课程id查询课程基本信息
    getCourseInfoId(id) {
        return request({
            url: `/eduservice/edu-course/getCourseInfo/${id}`,
            method: 'get',
        })
    },

    //4.修改课程基本信息
    updateCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/edu-course/updateCourseInfo`,
            method: 'post',
            data:courseInfo
        })
    },

    //5.课程确认信息显示
    getPublishCourseInfo(id) {
        return request({
            url: `/eduservice/edu-course/getPublishCourseInfo/${id}`,
            method: 'get',
        })
    },
    //6.课程最终发布
    publishCourse(id) {
        return request({
            url: `/eduservice/edu-course/publishCourse/${id}`,
            method: 'post'
        })
    },
}