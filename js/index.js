function Html(src){
    return (
        `<div class="image-item">
            <div class="img">
                <img src="${src}">
            </div>
            <div class="manage">
                
            </div>
            <div class="left"></div>
        </div>
        `
    )
}
class ImageEditor{
    constructor ( json ) {
        this.el = json.el;
        this.canvas = json.canvas;
        this.ctx = json.canvas.getContext("2d");
        this.clientLeft = this.el.clientLeft;
        this.clientTop = this.el.clientTop;
        this.$el = $(this.el)
        this.canMove = false;
        this.canScale = false;
        this.imgs = []
        this.init()
    }
    init(){
        this.imgMove()
        this.scale()
    }
    //添加图片
    addImage(src){
        var $html = $(Html(src))
        this.$el.append( $html )
    }
    //图片的移动
    imgMove(){
        var self = this;
        var downLeft = 0
        var downRight = 0
        this.$el.on('mousedown','.manage',function(e){
            this.canMove = true;
            downLeft = e.offsetX;
            downRight = e.offsetY;
            $(this).addClass('move')
        })
        this.$el.on('mousemove','.manage',function(e){
            if( this.canMove ){
                var pageX = e.pageX;
                var pageY = e.pageY;
                $(this).parent().css({
                    left:pageX - self.clientLeft - downLeft ,
                    top: pageY - self.clientTop - downRight,
                })
                
            }
        })
        this.$el.on('mouseup',function(){
            for(var i = 0;i< $(this).find('.manage').length;i++){
                $(this).find('.manage')[i].canMove = false
            }
            $(this).find('.manage').removeClass('move')
        })
    }
    //图片的放大和缩小，在右下角点击
    scale(){
        var self = this;
        var left = 0;
        var top = 0
        this.$el.on('mousedown','.left',function(e){
            this.canScale = true;
            left = parseFloat($(this).parent().css('left'))
            top = parseFloat($(this).parent().css('top'))
        })
        this.$el.on('mousemove','.image-item',function(e){
            if( $(this).find('.left')[0].canScale ){
                var pageX = e.pageX;
                var pageY = e.pageY;
                $(this).css({
                    width:pageX - self.clientLeft -left,
                    height: pageY - self.clientTop -top,
                })
            }
        })
        this.$el.on('mouseup',function(){
            for( var i = 0;i< self.$el.find('.left').length;i++){
                self.$el.find('.left')[i].canScale = false
            }
        })
    }
    //合成图片
    create(){
        let imgs = this.$el.find('img')
        let con = this.$el.find('.image-item')
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        for(var i = 0;i<con.length;i++){
            let img = imgs[i]
            let left = parseFloat(con.eq(i).css('left'))
            let top = parseFloat(con.eq(i).css('top'))
            let width = parseFloat(con.eq(i).css('width'))
            let height = parseFloat(con.eq(i).css('height'))
            this.ctx.drawImage(img,left,top,width,height);
        }
    }
    //合成的图片转成base64
    canvasToURL(){
        return this.canvas.toDataURL("image/png")
    }
}
