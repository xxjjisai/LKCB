// compoents/like/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        blike:{
            type:Boolean,
            value:false,
        },
        count :{
            type:Number,
            value:3,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        yesSrc: '../images/like.png',
        noSrc: '../images/like@dis.png',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike:function (event){
            let blike = this.properties.blike;
            this.setData({
                blike:!blike
            })
        }
    }
})
