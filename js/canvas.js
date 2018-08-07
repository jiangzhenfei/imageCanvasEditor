let index = 0;
        const canvas = document.querySelector('#canvas')
        const ctx = canvas.getContext("2d");
        
        let img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = "./images/back.jpg";
        
        img.onload = function(){//图片加载完，再draw 和 toDataURL
            index++
            ctx.drawImage(img,0,0,500,500);
            if( index>=2 ){
                let src = canvas.toDataURL("image/png")
                
                const canvas2 = document.querySelector('#canvas2')
                const ctx2 = canvas2.getContext("2d");

                let img3 = new Image();
                img3.src = src;
                img3.onload = function(){
                    ctx2.drawImage(img3,0,0);
                }

            }
        };
        

        let img2 = new Image();
        img2.crossOrigin = 'Anonymous';
        img2.src = "./images/left.jpg";
        
        img2.onload = function(){//图片加载完，再draw 和 toDataURL
            index++
            
            ctx.drawImage(img2,200,200,200,200);
            if( index>=2 ){
                let src = canvas.toDataURL("image/png")
                
                const canvas2 = document.querySelector('#canvas2')
                const ctx2 = canvas2.getContext("2d");
                let img3 = new Image();
                img3.src = src;
                img3.onload = function(){
                    ctx2.drawImage(img3,0,0);
                }
            }
        };