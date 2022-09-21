<template>
    <div class="app-container">
        <!-- 表单页面 -->
        <el-form label-width="120px">
            <el-form-item label="讲师名称">
                <el-input v-model="teacher.name" />
            </el-form-item>
            <el-form-item label="讲师排序">
                <!-- 数据类型不一致：添加`:min=`，冒号 -->
                <el-input-number v-model="teacher.sort" controls-position="right" :min="0" />
            </el-form-item>
            <el-form-item label="讲师头衔">
                <el-select v-model="teacher.level" clearable placeholder="请选择">
                    <el-option :value="1" label="高级讲师" />
                    <el-option :value="2" label="首席讲师" />
                </el-select>
            </el-form-item>
            <el-form-item label="讲师资历">
                <el-input v-model="teacher.career" />
            </el-form-item>
            <el-form-item label="讲师简介">
                <el-input v-model="teacher.intro" :rows="10" type="textarea" />
            </el-form-item>
        
            <!-- 讲师头像：TODO -->
            <!-- 讲师头像 -->
            <el-form-item label="讲师头像">
            
                <!-- 头衔缩略图 -->
                <pan-thumb :image="teacher.avatar" />
                <!-- 文件上传按钮 -->
                <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
                </el-button>
            
                <!--
                  v-show：是否显示上传组件
                  :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                  :url：后台上传的url地址
                  @close：关闭上传组件
                  @crop-upload-success：上传成功后的回调 
                    <input type="file" name="file"/>
                  -->
                <image-cropper 
                    v-show="imagecropperShow"
                    :width="300" 
                    :height="300" 
                    :key="imagecropperKey"
                    :url="BASE_API+'/eduoss/fileoss'" 
                    field="file" 
                    @close="close" 
                    @crop-upload-success="cropSuccess" />
            </el-form-item>
        
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
//import { response } from 'express'
export default {
    components: { ImageCropper, PanThumb },
    data() {
        return {
            teacher: {
                name: '',
                sort: 0,
                level: 1,
                career: '',
                intro: '',
                avatar: ''
            },
            //上传头像弹框的组件是否显示
            imagecropperShow: false,
            imagecropperKey: 0,//上传组件key值
            BASE_API: process.env.BASE_API,//获取dev.env.js里面的地址
            saveBtnDisabled:false   //保存按钮是否禁用
        }
    },
    created() {//页面渲染之前执行
        this.init()
    },
    watch: {//监听
        $route(to, from) {//路由变化方式，路由发生变化，方法执行
            this.init()
        }
    },
    methods: {
        close() { //关闭上传头像弹框
            this.imagecropperShow = false
            //上传组件初始化
            this.imagecropperKey = this.imagecropperKey + 1
        },
        cropSuccess(data) {//上传成功的方法
            this.imagecropperShow = false
            //上传之后接口返回图片地址，得到地址并赋值
            this.teacher.avatar = data.url
            this.imagecropperKey = this.imagecropperKey + 1
        },
        init() {
            //判断路径有id值,做修改
            if (this.$route.params && this.$route.params.id) {
                //从路径获取id值
                const id = this.$route.params.id
                //调用根据id查询的方法
                this.getInfo(id)
            } else {//无id值，做添加操作，清空表单
                this.teacher = {}            
            }
        },

        //根据讲师id查询的方法
        getInfo(id) {
            teacherApi.getTeacherInfo(id)
                .then(response => {
                    this.teacher = response.data.teacher
                })
        },

        saveOrUpdate() {
            //判断是修改还是添加
            //根据teacher是否有id判断
            if (!this.teacher.id) {
                //添加
                this.saveTeacher()
            } else {
                //修改
                this.updateTeacher()
            }
            
        },
        //修改讲师的方法
        updateTeacher() {
            teacherApi.updateTeacherInfo(this.teacher)
                .then(response => {
                    //1.提示信息
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    //回到列表页面 路由跳转【重定向操作】
                    this.$router.push({path:'/teacher/table'})
                })
        },

        //添加讲师的方法
        saveTeacher() {
            teacherApi.addTeacher(this.teacher)
                .then(response => {//添加成功
                    //1.提示信息
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    //回到列表页面 路由跳转【重定向操作】
                    this.$router.push({path:'/teacher/table'})
                })
        }
    }
}
</script>