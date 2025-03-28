(function($) {

    'use strict';

    if ( window.innerWidth > 992 ) {

        gsap.registerPlugin(ScrollTrigger);

        var windowHeight = window.innerHeight - jQuery('#wrapper-navbar').outerHeight(true);

        if ( 
            ( typeof $('.panel') !== 'undefined' && $('.panel').length )
            && ( typeof $('.panel-text') !== 'undefined'&& $('.panel-text').length )
        ) {
            gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });

            var sections = gsap.utils.toArray('.panel');
            var sections_length = sections.length;

            sections.forEach((section, i) => {
            
                var tl = gsap.timeline({
                    
                    scrollTrigger: {
                        trigger: ".scroller",
                        start: () => "top -" + ( (windowHeight*i) ),
                        end: () => "+=" + ( windowHeight ),
                        scrub: 1,
                        toggleActions: "play none reverse none",
                        invalidateOnRefresh: true,     
                    }
                    
                })
                
                if ( i == ( sections_length - 1 ) ) {
                    tl
                    .to(section, { duration: 0.3, scale: 1, opacity: 1 })
                    ;
                } else {
                    tl
                    .to(section, { duration: 0.3, scale: 1, opacity: 1 })  
                    .to(section, { duration: 1, scale: 0, opacity: 0 }, 3)
                    ;
                }

            
            });
        
        
            gsap.set(".panel-text", { zIndex: (i, target, targets) => targets.length - i });
        
            var texts = gsap.utils.toArray('.panel-text');
            var texts_length = texts.length;

            texts.forEach((text, i) => {
            
                var tl = gsap.timeline({
                    
                    scrollTrigger: {
                        trigger: ".scroller",
                        start: () => "top -" + ( (windowHeight*i) ),
                        end: () => "+=" + ( windowHeight ),
                        scrub: 1,
                        toggleActions: "play none reverse none",
                        invalidateOnRefresh: true,     
                    }
                    
                })
                
                if ( i == ( texts_length - 1 ) ) {
                    tl
                    .to(text, { duration: 0.33, opacity: 1, y:"50%" })  
                    ;
                } else {
                    tl
                    .to(text, { duration: 0.33, opacity: 1, y:"50%" })  
                    .to(text, { duration: 0.33, opacity: 0, y:"0%" }, 0.66)
                    ;
                }

                
            });
        
            ScrollTrigger.create({
        
                trigger: ".scroller",
                scrub: true,
                // markers: true,
                pin: true,
                start: () => "top top",
                end: () => "+=" + ( (sections.length) * (windowHeight) ),
                invalidateOnRefresh: true,
        
            });
        }


        if ( typeof $('.spinning-object') !== 'undefined' && $('.spinning-object').length ) {
            let sections = gsap.utils.toArray(".spinning-object");
            sections.forEach( (section, i) => {  
                let canvas = section.querySelector("canvas");
                var folder = section.dataset.folder;
                var file = section.dataset.file;
                let text = section.querySelector(".text");
                let context = canvas.getContext("2d");
                canvas.width = 1158;
                canvas.height = 770;  
            
                let frameCount = section.dataset.frames;
                const currentFrame = index => (
                    `${folder}/${file}${(index + 1).toString().padStart(4, '0')}.png`
                );

                let images = []
                let airpods = {
                    frame: 0
                };
                
                for (let i = 0; i < frameCount; i++) {
                    let img = new Image();
                    img.src = currentFrame(i);
                    images.push(img);
                }
            
                gsap.timeline({
                    onUpdate: render,
                        scrollTrigger: {
                        trigger: section,
                        pin: true,
                        scrub: 0.5,
                        // end: "+=200%",
                        start: () => "top -" + ( (windowHeight*i) ),
                        end: () => "+=" + ( windowHeight ),
                        // markers: true
                    }
                })
                .to(text, {
                    opacity: 1,
                    x: -100,
                    duration: 0.15
                })
                .to(airpods, {
                    scrub: 0.5,
                    frame: frameCount - 1,
                    snap: "frame",
                    ease: "none",
                    duration: 0.1
                }, 0);
                
                images[0].onload = render;
            
                function render() {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(images[airpods.frame], 0, 0); 
                }
            });

            ScrollTrigger.create({
        
                trigger: ".scroller",
                scrub: true,
                // markers: true,
                pin: true,
                start: () => "top top",
                end: () => "+=" + ( (sections.length) * (windowHeight) ),
                invalidateOnRefresh: true,
        
            });
        }

        if ( typeof $('.hover-column') !== 'undefined' && $('.hover-column').length ) {
            let delSections = document.querySelectorAll(".hover-column");

            delSections.forEach(section => {

                let imageAnim = gsap.to(section.querySelector(".slide-in"), {
                    y: "-100",
                    ease: "none",
                    opacity: 1,
                    paused: true
                });
                
                let progressTo = gsap.quickTo(imageAnim, "progress", {ease: "power3", duration: parseFloat(section.dataset.scrub) || 0.1});
                
                gsap.to(section.querySelector(".slide-in"), {
                    y: "200",
                    ease: "none",
                    opacity: 0,
                    toggleActions: "play none",
                    scrollTrigger: {
                        scrub: true,
                        trigger: section,
                        start: "top bottom",
                        end: "top +=" + ( window.innerHeight / 2 ),
                        onUpdate: self => progressTo(self.progress)
                    }
                });
                
            });  
        }  
        
    }

})( jQuery );