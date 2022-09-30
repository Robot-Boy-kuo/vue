import request from '@/utils/request'

export default {
    
    //1.添加小节
    addVideo(video) {
        return request({
            url: `/eduservice/video/addVideo`,
            method: 'post',
            data: video
        })
    },


    //修改章节
    updateVideo(video) {
        return request({
            url: `/eduservice/video/updateVideo`,
            method: 'post',
            data: video
        })
    },

    //删除章节
    deleteVideo(id) {
        return request({
            url: `/eduservice/video/${id}`,
            method: 'delete',
        })
    },


    getVideo(videoId) {
        return request({
            url: `/eduservice/video/getVideoInfo/${videoId}`,
            method: 'get',
        })
    },

}