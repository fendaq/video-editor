
$.fn.extend({
    //---元素拖动插件
    dragging:function(data){
        var $this = $(this);
        var xPage;
        var yPage;
        var X;//
        var Y;//
        var xRand = 0;//
        var yRand = 0;//
        var father = $this.parent();
        var defaults = {
            move : 'both',
            hander:1
        }
        var opt = $.extend({},defaults,data);
        var movePosition = opt.move;

        var hander = opt.hander;

        if(hander == 1){
            hander = $this;
        }else{
            hander = $this.find(opt.hander);
        }

        //---初始化
        //father.css({"position":"relative","overflow":"hidden"});
        father.css({"overflow":"hidden"});
        $this.css({"position":"absolute"});
        hander.css({"cursor":"move"});

        var faWidth = father.width();
        var faHeight = father.height();
        var thisWidth = $this.width()+parseInt($this.css('padding-left'))+parseInt($this.css('padding-right'));
        var thisHeight = $this.height()+parseInt($this.css('padding-top'))+parseInt($this.css('padding-bottom'));

        var mDown = false;//
        var positionX;
        var positionY;
        var moveX ;
        var moveY ;

        hander.mousedown(function(e){
            thisWidth = $this.width()+parseInt($this.css('padding-left'))+parseInt($this.css('padding-right'));
            thisHeight = $this.height()+parseInt($this.css('padding-top'))+parseInt($this.css('padding-bottom'));

            father.children().css({"zIndex":"0"});
            $this.css({"zIndex":"1"});
            selectEffect(parseInt($this[0].id.replace("effect", "")));
            mDown = true;
            X = e.pageX;
            Y = e.pageY;
            positionX = $this.position().left;
            positionY = $this.position().top;
            return false;
        });

        $(document).mouseup(function(e){
            mDown = false;
        });

        $(document).mousemove(function(e){
            xPage = e.pageX;//--
            moveX = positionX+xPage-X;

            yPage = e.pageY;//--
            moveY = positionY+yPage-Y;

            function thisXMove(){ //x轴移动
                if(mDown == true){
                    $this.css({"left":moveX});
                }else{
                    return;
                }
                if(moveX < 0){
                    $this.css({"left":"0"});
                }
                if(moveX > (faWidth-thisWidth)){
                    $this.css({"left":faWidth-thisWidth});
                }
                return moveX;
            }

            function thisYMove(){ //y轴移动
                if(mDown == true){
                    $this.css({"top":moveY});
                }else{
                    return;
                }
                if(moveY < 0){
                    $this.css({"top":"0"});
                }
                if(moveY > (faHeight-thisHeight)){
                    $this.css({"top":faHeight-thisHeight});
                }
                return moveY;
            }

            function thisAllMove(){ //全部移动
                if(mDown == true){
                    $this.css({"left":moveX,"top":moveY});
                }else{
                    return;
                }
                if(moveX < 0){
                    $this.css({"left":"0"});
                }
                if(moveX > (faWidth-thisWidth)){
                    $this.css({"left":faWidth-thisWidth});
                }

                if(moveY < 0){
                    $this.css({"top":"0"});
                }
                if(moveY > (faHeight-thisHeight)){
                    $this.css({"top":faHeight-thisHeight});
                }
            }
            if(movePosition.toLowerCase() == "x"){
                thisXMove();
            }else if(movePosition.toLowerCase() == "y"){
                thisYMove();
            }else if(movePosition.toLowerCase() == 'both'){
                thisAllMove();
            }
        });
    }
});
