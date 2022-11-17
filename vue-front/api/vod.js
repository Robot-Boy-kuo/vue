import request from '@/utils/request'
export default{
    getPlayAuth(vid) {
        return request({
            url: `/eduvod/video/get-play-auth/getPlayAuth/${vid}`,
            method:'get'
        })
    }
}