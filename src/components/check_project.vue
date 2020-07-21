<template>
  <el-container class="content">
      <el-header class="header">
        <h1 class="hospital-name">{{hospitalName}}</h1>
        <label class="form-content">
        <span class="form-name">检查分类</span>
          <el-select class="select-form" v-model="value" placeholder="全部" @change="getIndex">
             <el-option
              v-for="item in TotalOptions"
              :key="item.value"
              :label="item.label"
              :value="{value:item.value,label:item.label,subproperty:item.subproperty}"
              >
             </el-option>
          </el-select>
        <span class="form-name">检查子分类</span>
          <el-select class="select-form" v-model="value2" placeholder="全部">
              <el-option
               v-for="item in indexOfTotalvalue"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
          </el-select>
          <el-select
            style="margin-left:15px"
            v-model="value"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="输入检查项目名称查询"
            :remote-method="remoteMethod"
            :loading="loading">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>  
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </label>
        <div class="form-controler">
          <el-button type="primary" style="background-color:green">模板下载</el-button>
          <el-button type="primary">导入</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="primary">新增</el-button>
          <el-button type="primary" @click="deleteDialog">删除</el-button>
        </div>
        
      </el-header>
      <el-main>
        <el-table 
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>
          <el-table-column
           type="index"
           label="序号"
           width="50"
           align="center">
          </el-table-column>
          <el-table-column
            prop="num"
            label="检查项目编码"
            width="120"
            align="center">
          <template slot-scope="scope">{{ scope.row.checkdEncoding }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="检查项目名称"
            width="150"
            align="center">
          <template slot-scope="scope">{{ scope.row.projectName }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="部位"
            show-overflow-tooltip
            align="center">
          <template slot-scope="scope">{{ scope.row.site }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="部位编码"
            show-overflow-tooltip
            align="center">
          <template slot-scope="scope">{{ scope.row.siteEncoding }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="检查分类"
            width="120"
            align="center">
          <template slot-scope="scope">{{ scope.row.classify }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="检查分类编码"
            width="120"
            align="center">
          <template slot-scope="scope">{{ scope.row.classifyEncoding }}</template>

          </el-table-column>
          <el-table-column
            prop="name"
            label="检查子分类"
            width="120"
            align="center">
          <template slot-scope="scope">{{ scope.row.subclassification }}</template>

          </el-table-column>
          <el-table-column
            prop="name"
            label="检查子分类编码"
            width="120"
            align="center">
          <template slot-scope="scope">{{ scope.row.subclassificationCode }}</template>

          </el-table-column>
          <el-table-column
            prop="name"
            label="拼音码"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="五笔码"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="排序序号"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="执行科室"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="参考金额"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="HIS编码"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="HIS名称"
            width="120"
            align="center">
          </el-table-column>
           <el-table-column
            prop="name"
            label="是否启用"
            width="120"
            align="center">
          </el-table-column>
           <el-table-column
            prop="name"
            label="操作"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="dialogFormVisible=true">编辑</el-button>
              <el-dialog title="编辑"  :visible.sync="dialogFormVisible">
                <el-form :label-position="labelPosition">
                  <el-form :model="form">
                    <el-form-item label="检查项目编码" :label-width="formLabelWidth">
                      <el-input v-model="scope.row.checkdEncoding" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="部位名称" :label-width="formLabelWidth">
                    <el-select v-model="scope.row.site" placeholder="选择检查部位">
                      <el-option label="部位一" value="部位一"></el-option>
                      <el-option label="部位二" value="部位二"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="检查分类" :label-width="formLabelWidth">
                    <el-select v-model="scope.row.classify" placeholder="选择检查部位">
                      <el-option label="分类一" value="部位一"></el-option>
                      <el-option label="分类二" value="部位二"></el-option>
                    </el-select>
                  </el-form-item>  
                   <el-form-item label="检查子分类" :label-width="formLabelWidth">
                    <el-select v-model="scope.row.subclassification" placeholder="选择检查部位">
                      <el-option label="部位一" value="部位一"></el-option>
                      <el-option label="部位二" value="部位二"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="拼音码" :label-width="formLabelWidth">
                    <el-input v-model="scope.row.PinYinCode" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="排序序号" :label-width="formLabelWidth">
                    <el-input v-model="scope.row.order" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="执行科室" :label-width="formLabelWidth" :label-Position="left" :align="left">
                    <el-select v-model="scope.row.department" placeholder="选择执行科室">
                      <el-option label="部位一" value="部位一"></el-option>
                      <el-option label="部位二" value="部位二"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="HIS编码" :label-width="formLabelWidth">
                    <el-input v-model="scope.row.HISCode" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="检查项目名称" :label-width="formLabelWidth">
                      <el-input v-model="scope.row.projectName" autocomplete="off"></el-input>
                    </el-form-item>
                  <el-form-item label="部位编码" :label-width="formLabelWidth">
                    <el-input v-model="scope.row.siteEncoding" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="检查分类编码" :label-width="formLabelWidth">
                    <el-input v-model="scope.row.classifyEncoding" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="检查分类子编码" :label-width="formLabelWidth">
                    <el-input v-model="scope.row.subclassificationCode" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="五笔码" :label-width="formLabelWidth">
                    <el-input v-model="scope.row.WuBiCode" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="参考金额" :label-width="formLabelWidth">
                    <el-input v-model="scope.row.referenceAmount" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="HIS名称" :label-width="formLabelWidth">
                    <el-input v-model="scope.row.HISName" autocomplete="off"></el-input>
                  </el-form-item>
                  </el-form>
                <el-form :model="form" >
                  
                  
                  </el-form>
                  <el-form-item label="是否启用" label-position='left' :label-width="formLabelWidth">
                    <el-switch v-model="scope.row.isEnable"></el-switch>
                  </el-form-item>
                                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible=false">取消</el-button>
                  <el-button type="promary" @click="dialogFormVisible=false">确定</el-button>
                </div>
              </el-dialog>
          </template>
          </el-table-column>
          </el-table>
      </el-main>
  </el-container>
</template>

<script>
export default {
  name:'CheckProject',
  data() { 
    return {
        // subproperty : TotalOptions[indexOfTotalvalue],
        formLabelWidth:'120px',
        labelPosition:'right',
        hospitalName:'连云港市第一人民医院',
        TotalOptions:[{
          value:'选项1',
          label:'检查分类1',
          subproperty:[{
              value:'子选项1',
              label:'检查子分类1.1'
            },{
              value:'子选项2',
              label:'检查子分类1.2'
            },{
              value:'子选项3',
              label:'检查子分类1.3'
            }]
          },{
          value:'选项2',
          label:'检查分类2',
          subproperty:[
            {
              value:'子选项1',
              label:'检查子分类2.1'
            },{
              value:'子选项2',
              label:'检查子分类2.2'
            },{
              value:'子选项3',
              label:'检查子分类2.3'
            }
            ]
          },{
          value:'选项3',
          label:'检查分类3',
          subproperty:[{
              value:'子选项1',
              label:'检查子分类3.1'
            },{
              value:'子选项2',
              label:'检查子分类3.2'
            },{
              value:'子选项3',
              label:'检查子分类3.3'
            }]
          }],
          Totalvalue:'全部',
          value:'全部',
          value2:'',
          indexOfTotalvalue:'',
          dialogFormVisible:false,
          



          tableData: [{
          checkdEncoding: '1403LCTN0068',
          projectName: '眼眶CT冠状位扫描',
          site: '眼眶',
          siteEncoding:'1403',
          classify:'CT',
          classifyEncoding:'01',
          subclassification:'CT冠状位扫描',
          subclassificationCode:'421',
          PinYinCode:'',
          WuBiCode:'',
          order:'1',
          department:'通灌院区-CT室；高新院区-CT室',
          referenceAmount:'239.8',
          HISCode:'LCTN0068',
          HISName:'CT冠状位扫描',
          isEnable:'是'
         }, {
          checkdEncoding: '1423LCTN0068',
          projectName: '蝶鞍CT冠状位扫描',
          site: '蝶鞍CT',
          siteEncoding:'1423',
          classify:'CT',
          classifyEncoding:'01',
          subclassification:'CT冠状位扫描',
          subclassificationCode:'421',
          PinYinCode:'',
          WuBiCode:'',
          order:'1',
          department:'通灌院区-CT室；高新院区-CT室',
          referenceAmount:'239.8',
          HISCode:'LCTN0068',
          HISName:'CT冠状位扫描',
          isEnable:'是'
         }, {
          checkdEncoding: '1401LCTN0068',
          projectName: '头颅CT冠状位扫描',
          site: '头颅',
          siteEncoding:'1401',
          classify:'CT',
          classifyEncoding:'01',
          subclassification:'CT冠状位扫描',
          subclassificationCode:'421',
          PinYinCode:'',
          WuBiCode:'',
          order:'1',
          department:'通灌院区-CT室；高新院区-CT室',
          referenceAmount:'239.8',
          HISCode:'LCTN0068',
          HISName:'CT冠状位扫描',
          isEnable:'是'
         }, {
          checkdEncoding: '1404LCTN0068',
          projectName: '视神经管CT冠状位扫描',
          site: '视神经管',
          siteEncoding:'1404',
          classify:'CT',
          classifyEncoding:'01',
          subclassification:'CT冠状位扫描',
          subclassificationCode:'421',
          PinYinCode:'',
          WuBiCode:'',
          order:'1',
          department:'通灌院区-CT室；高新院区-CT室',
          referenceAmount:'239.8',
          HISCode:'LCTN0068',
          HISName:'CT冠状位扫描',
          isEnable:'是'
         },{
          checkdEncoding: '1403LCTN0068',
          projectName: '眼眶CT冠状位扫描',
          site: '眼眶',
          siteEncoding:'1403',
          classify:'CT',
          classifyEncoding:'01',
          subclassification:'CT冠状位扫描',
          subclassificationCode:'421',
          PinYinCode:'',
          WuBiCode:'',
          order:'1',
          department:'通灌院区-CT室；高新院区-CT室',
          referenceAmount:'239.8',
          HISCode:'LCTN0068',
          HISName:'CT冠状位扫描',
          isEnable:'是'
         }, {
          checkdEncoding: '1403LCTN0068',
          projectName: '眼眶CT冠状位扫描',
          site: '眼眶',
          siteEncoding:'1403',
          classify:'CT',
          classifyEncoding:'01',
          subclassification:'CT冠状位扫描',
          subclassificationCode:'421',
          PinYinCode:'',
          WuBiCode:'',
          order:'1',
          department:'通灌院区-CT室；高新院区-CT室',
          referenceAmount:'239.8',
          HISCode:'LCTN0068',
          HISName:'CT冠状位扫描',
          isEnable:'是'
         }, {
          checkdEncoding: '1403LCTN0068',
          projectName: '眼眶CT冠状位扫描',
          site: '眼眶',
          siteEncoding:'1403',
          classify:'CT',
          classifyEncoding:'01',
          subclassification:'CT冠状位扫描',
          subclassificationCode:'421',
          PinYinCode:'',
          WuBiCode:'',
          order:'1',
          department:'通灌院区-CT室；高新院区-CT室',
          referenceAmount:'239.8',
          HISCode:'LCTN0068',
          HISName:'CT冠状位扫描',
          isEnable:'是'
         }],
        multipleSelection: [],
        
    
    }
  },
  methods:{
    getIndex:function(params){
       this.value2='';
       this.indexOfTotalvalue = params.subproperty;
    },
    deleteDialog:function(){
      this.$confirm("此操作将永久删除文件，是否继续？",'提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning',
        
      }).then(()=>{
        this.$message({
          type:'success',
          message:'删除成功！'
        });
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消删除'
        });
      })
    },
    handleEdit(index,row){

    }
}
 }
</script >

<style >
.content {
  font-family: 'Arial Normal', 'Arial';
}
.header {
  width: 100%;
  height: 187px;
  position: absolute;
  margin-top: 0;
  /* display: flex; */
  /* border: 1px solid gray; */
}
.hospital-name {
  display: flex;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
}
.form-content {
  display: flex;
  margin-top: 10px;
}
.form-name {
  display: flex;
  margin-left: 15px;
  /*设置检查分类和检查子分类与左边框的距离*/
  align-items: center;
}
.select-form {
  display: flex;
  margin-left:10px;
}
.form-controler {
  display: flex;
  margin-top: 10px;
}
div+button {
  margin-left: 10px;
}
.el-main {
  position: absolute;
  width: 100%;
  top: 218px;
  left: 0px;
  font-family:Arial, Helvetica, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 13px;
  color: #333333;
  text-align: center;
  line-height: normal;
}

</style>