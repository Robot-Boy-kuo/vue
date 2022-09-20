<template>
    <div class="app-container">
       

        <!--查询表单-->
        <!-- :inline="true"在一行内显示+单向绑定 -->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="teacherQuery.name" placeholder="讲师名" />
            </el-form-item>
        
            <el-form-item>
                <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
                    <el-option :value="1" label="高级讲师" />
                    <el-option :value="2" label="首席讲师" />
                </el-select>
            </el-form-item>
        
            <el-form-item label="添加时间">
                <el-date-picker v-model="teacherQuery.begin" type="datetime" placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="teacherQuery.end" type="datetime" placeholder="选择截止时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item>
        
            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
        </el-form>


        <!-- 表格 -->
        <el-table v-loading="listloading" :data="list" element-loading-text="数据加载中" border fit highlight-current-row>
            
            <el-table-column label="序号" width="70" align="center">
                <template slot-scope="scope">
                    {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
            </el-table-column>
        
            <el-table-column prop="name" label="名称" width="80" />
        
            <el-table-column label="头衔" width="80">
                <!-- scope为域，一般用于判断操作 -->
                <template slot-scope="scope">
                    <!-- `===`两个等号判断值，三个等号判断类型(1 '1')和值 -->
                    {{ scope.row.level===1?'高级讲师':'首席讲师' }}
                </template>
            </el-table-column>
        
            <el-table-column prop="intro" label="资历" />
        
            <el-table-column prop="gmtCreate" label="添加时间" width="160" />
        
            <el-table-column prop="sort" label="排序" width="60" />
        
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/teacher/edit/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination 
            :current-page="page" 
            :page-size="limit" 
            :total="total" 
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper" 
            @current-change="getList" />

    </div>
</template>

<script>
    //引入teacher.js文件
import teacher from '@/api/edu/teacher'
//import { response } from 'express';

export default {
    //核心代码位置
    // data: {

    // },
    data() {        //定义变量和初始值
        return {
            list:null,//查询之后接口返回集合
            page: 1,//当前页
            limit: 5,//每页记录数
            total:0,//总记录数
            teacherQuery:{}//条件封装对象
        }
    },
    created() {     //页面渲染之前执行，一般调用method定义的方法
        this.getList()
    },
    methods: {      //创建具体的方法，调用teacher.js定义的方法
        //讲师列表方法
        getList(page = 1) {
            this.page = page
            teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
                .then(response => {//请求成功
                    //response接口返回的数据
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
                .catch(error=>{//请求失败
                    console.log(error)
                })
        },
        
        resetData() {
            //1.清空条件值
            //利用双向绑定，清空绑定的对象
            this.teacherQuery = {}
            //2.查询所有数据
            this.getList()
        }
        
    }

}
</script>