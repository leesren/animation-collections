# 文字/图片 粒子 
![](example.gif)
```javascript   
 let wave = new Wave({
      el: document.getElementById('waves'),
      speed: 4,
      // time: 1,
      waves: [{
        timeModifier: 1,// 时间
        lineWidth: 1,// 线宽
        amplitude: 100,// 振幅
        wavelength: 200,// 波长
        segmentLength: 20// 波片段
          //       strokeStyle: 'rgba(255, 255, 255, 0.5)'
      }, {
        timeModifier: 1.2,
        lineWidth: 1,
        amplitude: 100,
        wavelength: 100,
        segmentLength: 20
      }],

      resizeEvent() {
        let gradient = this.ctx.createLinearGradient(0, 0, this.width, 0)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        // gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
        // gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)')
        // gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        let index = -1
        let length = this.waves.length
        while (++index < length) {
          this.waves[index].strokeStyle = gradient
        }
      }
    })

    setTimeout(() => {
      wave.run()
    }, 500)
```

