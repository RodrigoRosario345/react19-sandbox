import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function SecuenceAnimation(box: HTMLDivElement) {
  let intro = gsap.timeline();
  intro
    .to(box, { x: 200, duration: 4, delay: 4, yoyo: true })
    .to(box, { rotation: 360, backgroundColor: "red", duration: 2 }, "-=4"); // total = 4s

  // console.log(intro.duration());

  // A) Bloque normal (dura 4s)
  // let main1 = gsap.timeline();
  // main1.add(intro);

  // B) Control como objeto (forzado a 2s)
  let main2 = gsap.timeline();

  main2.to(intro, {
    duration: 4,
    time: intro.duration() / 2,
    onComplete: () => {
      intro.pause();
    },
  });
  // main2.time(2);
  console.log(main2.totalDuration());

  setTimeout(() => {
    console.log("duration: ", main2.duration());
    console.log("time now: ", main2.time());
    console.log("progress now: ", main2.progress());
    console.log("is active: ", main2.isActive());
  }, 4000);
}

function fromToAnimation(box: HTMLDivElement) {
  gsap.fromTo(
    box,
    {
      width: 200,
      height: 200,
      backgroundColor: "red",
    },
    {
      width: 400,
      height: 400,
      backgroundColor: "green",
      duration: 4,
      delay: 4,
      immediateRender: false,
    }
  );
}


const animateFunc = (element: HTMLDivElement) => {
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(
    element,
    {
      scale: 0,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      zIndex: 100,
      duration: 4,
      yoyo: true,
      repeat: 1,
      ease: "power1.in",
      immediateRender: false,
    }
  ).fromTo(
    element,
    { xPercent: 400 },
    {
      xPercent: -400,
      duration: 8,
      ease: "none",
      immediateRender: false,
    },
    0
  );
  return tl;
};


type ContainerType = HTMLDivElement | null;


type ScrollHorizVertAnimation = [gsap.core.Tween, ScrollTrigger]

function scrollHorizVertAnimationOne(container: ContainerType, panels: HTMLDivElement[]): ScrollHorizVertAnimation {
  const tweenPanels = gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: "none"
  })

  const createScrollPanels = ScrollTrigger.create({
    trigger: container,
    start: "bottom center",
    // start: "top 50%-=150px",
    // end: "bottom 50%-=150px",
    // end: "bottom 40%",
    // end: "+=300 70%",
    end: `+=300px`,
    scrub: true,
    markers: true,
    pin: ".main",
    animation: tweenPanels,
    onEnter: () => console.log("entró"),
    onLeave: () => console.log("salió abajo"),
    onEnterBack: () => console.log("volvió"),
    onLeaveBack: () => console.log("salió arriba"),
    onUpdate: self => console.log("scroll:", self.scroll())
  });

  return [tweenPanels, createScrollPanels]
}

function createScrollSectionNews(boxs: HTMLDivElement[]): void {
  console.log("boxs: ", boxs)

  const tweenBox = gsap.to(boxs, {
    xPercent: -100 * (boxs.length - 1),
    ease: "none"
  })

  ScrollTrigger.create({
    start: 0,
    end: `+=400px`,
    scrub: true,
    markers: true,
    pin: ".content",
    scroller: ".section-news",
    animation: tweenBox,
  });
}

const panelChildHorizTween = (tweenPanels: gsap.core.Tween): gsap.core.Tween => {

  return gsap.to(".panel-child", {
    rotateY: 360,
    backgroundColor: "red",
    ease: "none",
    duration: 3,
    repeat: -1,
    scrollTrigger: {
      trigger: ".panel-child",
      containerAnimation: tweenPanels,
      start: "left center",
      end: "right center-=150px",
      markers: true,
      onLeave: (self) => {
        self.animation?.pause();
      },
      onEnterBack: (self) => {
        self.animation?.resume();
      },
      onLeaveBack: (self) => {
        self.animation?.pause();
      }
      // scrub: true,
    }
  })

}

interface Playhead {
  offset: number
}



export function GsapAnimationTest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  // const sectionNewsRef = useRef<HTMLDivElement>(null);
  const querySelectorAll = gsap.utils.selector(mainRef);
  // const 
  const tl = useRef<gsap.core.Timeline>(null);
  const trigger = useRef<ScrollTrigger>(null);

  // const handledClickPlay = () => {
  //   tl.current?.play();
  // }

  // const handledClickPause = () => {
  //   tl.current?.pause();
  // }

  // const handledClickRestart = () => {
  //   tl.current?.restart()
  // }

  // const handledClickSeek = () => {
  //   tl.current?.seek("half");
  // }
  const handledClickMoveScroll = () => {
    console.log("Move scroll 100");
    trigger.current?.scroll(998);
    console.log("trigger scroll position: ", trigger.current?.scroll())
  }

  useGSAP(
    () => {
      // SecuenceAnimation(box.current as HTMLDivElement);
      // tl.current = animateFunc(boxRef.current as HTMLDivElement);
      // tl.current.addLabel("half", 4);
      const panels = querySelectorAll<HTMLDivElement>(".panel")
      const [tweenPanels, createScrollPanels] = scrollHorizVertAnimationOne(containerRef.current, panels);
      trigger.current = createScrollPanels;
      const boxs = querySelectorAll<HTMLDivElement>(".box");
      createScrollSectionNews(boxs);
      // const triggerChildPanel = panelChildHorizTween(tweenPanels);



      // const playhead: Playhead = { offset: 0 };

      // const tween = gsap.to(playhead, {
      //   paused: true,
      //   offset: 0,
      //   duration: 10,
      //   ease: "power2.out",
      //   onUpdate: () => console.log(playhead.offset)
      // })

      // tween.vars.offset = 20;
      // tween.invalidate().restart();

      // tween.play();





    },
    { dependencies: [] }
  );

  return (
    <div className="main" ref={mainRef}>
      <div className="h-screen w-full bg-orange-400"></div>
      <div className="w-full flex overflow-hidden" ref={containerRef}>
        <div className="panel h-[300px] min-w-full bg-blue-800"></div>
        <div className="panel h-[300px] min-w-full bg-amber-700"></div>
        <div className="panel h-[300px] min-w-full bg-emerald-600">
          <div className="panel-child size-[150px] bg-gray-600 rounded-md absolute inset-0 m-auto"></div>
        </div>
        <div className="panel h-[300px] min-w-full bg-black"></div>
        {
          /*<div className="flex justify-center gap-2">
          <button onClick={handledClickPlay} className="bg-blue-950 px-3 py-1 border border-white text-white rounded-md cursor-pointer">PLAY</button>
          <button onClick={handledClickPause} className="bg-blue-950 px-3 py-1 border border-white text-white rounded-md cursor-pointer">PAUSE</button>
          <button onClick={handledClickRestart} className="bg-blue-950 px-3 py-1 border border-white text-white rounded-md cursor-pointer">RESTART</button>
          <button onClick={handledClickSeek} className="bg-blue-950 px-3 py-1 border border-white text-white rounded-md cursor-pointer">JUMP</button>
          </div>*/
        }
      </div>
      <div className="previous_section h-screen w-full bg-orange-950">
        <button onClick={handledClickMoveScroll} className="bg-blue-950 m-3 px-3 py-1 border border-white text-white rounded-md cursor-pointer">MOVE SCROLL 100</button>
      </div>

      <div className="section-news w-full h-[400px] overflow-y-auto  bg-gray-300">
        <div className="content w-full flex overflow-x-hidden">
          <div className="box h-[400px] min-w-full bg-red-500"></div>
          <div className="box h-[400px] min-w-full bg-amber-500"></div>
          <div className="box h-[400px] min-w-full bg-green-500"></div>
          <div className="box h-[400px] min-w-full bg-orange-900"></div>
          <div className="box h-[400px] min-w-full bg-blue-400"></div>
        </div>
      </div>
    </div>

  );
}
