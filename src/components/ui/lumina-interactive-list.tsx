"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";

export interface LuminaSlide {
  title: string;
  description: string;
  media: string;
  category?: string;
}

interface LuminaInteractiveListProps {
  slides?: LuminaSlide[];
  effect?: "glass" | "frost" | "ripple" | "plasma" | "timeshift";
  autoSlideSpeed?: number;
  className?: string;
  onSlideChange?: (index: number) => void;
}

const DEFAULT_SLIDES: LuminaSlide[] = [
  {
    title: "Chanel Haute Couture",
    description: "Producción exclusiva capturada en Manhattan para Marie Claire.",
    media: "/images/extracted/chanel-hc/img-005.webp",
    category: "Haute Couture",
  },
  {
    title: "Valentina Ferrer",
    description: "Sastrería contemporánea y alta costura en New York Fashion Issue.",
    media: "/images/catalog_v2/portadas/1c2c1c68-11f5-4d8f-a4f6-745ea9cc1f32.jpg",
    category: "Editorial",
  },
  {
    title: "Gucci Cruise Campaign",
    description: "Campaña de sastrería ecuestre y piezas de autor en locación rural.",
    media: "/images/extracted/gucci-rural/img-000.webp",
    category: "Campañas",
  },
  {
    title: "Dolores Fonzi en Cannes",
    description: "Estilismo exclusivo de alta costura para alfombras rojas de cine.",
    media: "/images/extracted/dolores-fonzi/img-000.webp",
    category: "Celebrity",
  },
  {
    title: "Belu Negri DMAG",
    description: "Vanguardia pop y retrato editorial para portada de DMAG Magazine.",
    media: "/images/catalog_v2/BELU NEGRI/A.jpg",
    category: "Editorial",
  },
  {
    title: "Leonie D&G Milán",
    description: "Fashion Week de Milán con Dolce & Gabbana Alta Moda.",
    media: "/images/extracted/leonie-dg/img-000.webp",
    category: "Campañas",
  },
];

export function LuminaInteractiveList({
  slides = DEFAULT_SLIDES,
  effect = "glass",
  autoSlideSpeed = 5000,
  className = "",
  onSlideChange,
}: LuminaInteractiveListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // References to keep state across effects
  const stateRef = useRef<{
    currentSlideIndex: number;
    isTransitioning: boolean;
    shaderMaterial: any;
    renderer: any;
    scene: any;
    camera: any;
    slideTextures: any[];
    texturesLoaded: boolean;
    autoSlideTimer: any;
    progressAnimation: any;
    sliderEnabled: boolean;
  }>({
    currentSlideIndex: 0,
    isTransitioning: false,
    shaderMaterial: null,
    renderer: null,
    scene: null,
    camera: null,
    slideTextures: [],
    texturesLoaded: false,
    autoSlideTimer: null,
    progressAnimation: null,
    sliderEnabled: false,
  });

  useEffect(() => {
    const state = stateRef.current;
    state.currentSlideIndex = 0;
    state.isTransitioning = false;
    state.slideTextures = [];
    state.texturesLoaded = false;
    state.sliderEnabled = false;

    const SLIDER_CONFIG: any = {
      settings: {
        transitionDuration: 2.2,
        autoSlideSpeed,
        currentEffect: effect,
        currentEffectPreset: "Default",
        globalIntensity: 1.0,
        speedMultiplier: 1.0,
        distortionStrength: 1.0,
        colorEnhancement: 1.0,
        glassRefractionStrength: 1.0,
        glassChromaticAberration: 1.0,
        glassBubbleClarity: 1.0,
        glassEdgeGlow: 1.0,
        glassLiquidFlow: 1.0,
        frostIntensity: 1.5,
        frostCrystalSize: 1.0,
        frostIceCoverage: 1.0,
        frostTemperature: 1.0,
        frostTexture: 1.0,
        rippleFrequency: 25.0,
        rippleAmplitude: 0.08,
        rippleWaveSpeed: 1.0,
        rippleRippleCount: 1.0,
        rippleDecay: 1.0,
        plasmaIntensity: 1.2,
        plasmaSpeed: 0.8,
        plasmaEnergyIntensity: 0.4,
        plasmaContrastBoost: 0.3,
        plasmaTurbulence: 1.0,
        timeshiftDistortion: 1.6,
        timeshiftBlur: 1.5,
        timeshiftFlow: 1.4,
        timeshiftChromatic: 1.5,
        timeshiftTurbulence: 1.4,
      },
    };

    const PROGRESS_UPDATE_INTERVAL = 50;
    const SLIDE_DURATION = () => SLIDER_CONFIG.settings.autoSlideSpeed;
    const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

    // --- SHADERS ---
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture1, uTexture2;
      uniform float uProgress;
      uniform vec2 uResolution, uTexture1Size, uTexture2Size;
      uniform int uEffectType;
      uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength;
      uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
      uniform float uFrostIntensity, uFrostCrystalSize, uFrostIceCoverage;
      uniform float uRippleFrequency, uRippleAmplitude, uRippleWaveSpeed;
      uniform float uPlasmaIntensity, uPlasmaSpeed;
      uniform float uTimeshiftDistortion;
      varying vec2 vUv;

      vec2 getCoverUV(vec2 uv, vec2 textureSize) {
        vec2 s = uResolution / textureSize;
        float scale = max(s.x, s.y);
        vec2 scaledSize = textureSize * scale;
        // Anchor vertical position to upper-third (20%) so faces and outfits are never cut off
        vec2 offset = (uResolution - scaledSize) * vec2(0.5, 0.18);
        return (uv * uResolution - offset) / scaledSize;
      }

      vec4 glassEffect(vec2 uv, float progress) {
        float time = progress * 5.0 * uSpeedMultiplier;
        vec2 uv1 = getCoverUV(uv, uTexture1Size);
        vec2 uv2 = getCoverUV(uv, uTexture2Size);
        float maxR = length(uResolution) * 0.85;
        float br = progress * maxR;
        vec2 p = uv * uResolution;
        vec2 c = uResolution * 0.5;
        float d = length(p - c);
        float nd = d / max(br, 0.001);
        float param = smoothstep(br + 3.0, br - 3.0, d);
        vec4 img;
        if (param > 0.0) {
          float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
          vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
          vec2 distUV = uv2 - dir * ro;
          distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
          float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
          img = vec4(
            texture2D(uTexture2, distUV + dir * ca * 1.2).r,
            texture2D(uTexture2, distUV + dir * ca * 0.2).g,
            texture2D(uTexture2, distUV - dir * ca * 0.8).b,
            1.0
          );
          if (uGlassEdgeGlow > 0.0) {
            float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
            img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
          }
        } else {
          img = texture2D(uTexture2, uv2);
        }
        vec4 oldImg = texture2D(uTexture1, uv1);
        if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
        return mix(oldImg, img, param);
      }

      vec4 timeshiftEffect(vec2 uv, float progress) {
        vec2 uv1 = getCoverUV(uv, uTexture1Size);
        vec2 uv2 = getCoverUV(uv, uTexture2Size);
        float p = smoothstep(0.0, 1.0, progress);
        vec2 dist = vec2(sin(uv.y * 12.0 + p * 6.28), cos(uv.x * 12.0 + p * 6.28)) * 0.03 * uTimeshiftDistortion * (1.0 - abs(p - 0.5) * 2.0);
        vec4 col1 = texture2D(uTexture1, uv1 + dist);
        vec4 col2 = texture2D(uTexture2, uv2 - dist);
        return mix(col1, col2, p);
      }

      void main() {
        if (uEffectType == 0) gl_FragColor = glassEffect(vUv, uProgress);
        else if (uEffectType == 4) gl_FragColor = timeshiftEffect(vUv, uProgress);
        else gl_FragColor = glassEffect(vUv, uProgress);
      }
    `;

    const getEffectIndex = (n: string) =>
      ({ glass: 0, frost: 1, ripple: 2, plasma: 3, timeshift: 4 } as any)[n] || 0;

    const splitText = (text: string) => {
      return text
        .split("")
        .map(
          (char) =>
            `<span style="display: inline-block; opacity: 0;">${
              char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");
    };

    const updateContent = (idx: number) => {
      setActiveIdx(idx);
      if (onSlideChange) onSlideChange(idx);

      const titleEl = containerRef.current?.querySelector("#mainTitle");
      const descEl = containerRef.current?.querySelector("#mainDesc");
      if (titleEl && descEl && slides[idx]) {
        gsap.to(titleEl.children, {
          y: -15,
          opacity: 0,
          duration: 0.35,
          stagger: 0.015,
          ease: "power2.in",
        });
        gsap.to(descEl, { y: -8, opacity: 0, duration: 0.3, ease: "power2.in" });

        setTimeout(() => {
          titleEl.innerHTML = splitText(slides[idx].title);
          descEl.textContent = slides[idx].description;

          gsap.set(titleEl.children, { opacity: 0, y: 20 });
          gsap.set(descEl, { y: 15, opacity: 0 });

          gsap.to(titleEl.children, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.02,
            ease: "power3.out",
          });
          gsap.to(descEl, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.15,
            ease: "power3.out",
          });
        }, 350);
      }
    };

    const stopAutoSlideTimer = () => {
      if (state.progressAnimation) clearInterval(state.progressAnimation);
      if (state.autoSlideTimer) clearTimeout(state.autoSlideTimer);
      state.progressAnimation = null;
      state.autoSlideTimer = null;
    };

    const updateSlideProgress = (idx: number, prog: number) => {
      const items = containerRef.current?.querySelectorAll(".slide-nav-item");
      if (items && items[idx]) {
        const fill = items[idx].querySelector(".slide-progress-fill") as HTMLElement;
        if (fill) {
          fill.style.width = `${prog}%`;
          fill.style.opacity = "1";
        }
      }
    };

    const quickResetProgress = (idx: number) => {
      const items = containerRef.current?.querySelectorAll(".slide-nav-item");
      if (items && items[idx]) {
        const fill = items[idx].querySelector(".slide-progress-fill") as HTMLElement;
        if (fill) {
          fill.style.transition = "width 0.2s ease-out";
          fill.style.width = "0%";
          setTimeout(() => {
            fill.style.transition = "width 0.1s ease, opacity 0.3s ease";
          }, 200);
        }
      }
    };

    const updateNavigationState = (idx: number) => {
      const items = containerRef.current?.querySelectorAll(".slide-nav-item");
      if (items) {
        items.forEach((el, i) => el.classList.toggle("active", i === idx));
      }
    };

    const updateCounter = (idx: number) => {
      const sn = containerRef.current?.querySelector("#slideNumber");
      const st = containerRef.current?.querySelector("#slideTotal");
      if (sn) sn.textContent = String(idx + 1).padStart(2, "0");
      if (st) st.textContent = String(slides.length).padStart(2, "0");
    };

    const safeStartTimer = (delay = 0) => {
      stopAutoSlideTimer();
      if (state.sliderEnabled && state.texturesLoaded) {
        if (delay > 0) state.autoSlideTimer = setTimeout(startAutoSlideTimer, delay);
        else startAutoSlideTimer();
      }
    };

    const startAutoSlideTimer = () => {
      if (!state.texturesLoaded || !state.sliderEnabled) return;
      stopAutoSlideTimer();
      let progress = 0;
      const increment = (100 / SLIDE_DURATION()) * PROGRESS_UPDATE_INTERVAL;
      state.progressAnimation = setInterval(() => {
        if (!state.sliderEnabled) {
          stopAutoSlideTimer();
          return;
        }
        progress += increment;
        updateSlideProgress(state.currentSlideIndex, progress);
        if (progress >= 100) {
          clearInterval(state.progressAnimation);
          state.progressAnimation = null;
          if (!state.isTransitioning) {
            navigateToSlide((state.currentSlideIndex + 1) % slides.length);
          }
        }
      }, PROGRESS_UPDATE_INTERVAL);
    };

    const navigateToSlide = (targetIndex: number) => {
      if (
        state.isTransitioning ||
        targetIndex === state.currentSlideIndex ||
        !state.shaderMaterial
      )
        return;
      stopAutoSlideTimer();
      quickResetProgress(state.currentSlideIndex);

      const currentTexture = state.slideTextures[state.currentSlideIndex];
      const targetTexture = state.slideTextures[targetIndex];
      if (!currentTexture || !targetTexture) return;

      state.isTransitioning = true;
      state.shaderMaterial.uniforms.uTexture1.value = currentTexture;
      state.shaderMaterial.uniforms.uTexture2.value = targetTexture;
      state.shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
      state.shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;

      updateContent(targetIndex);

      state.currentSlideIndex = targetIndex;
      updateCounter(state.currentSlideIndex);
      updateNavigationState(state.currentSlideIndex);

      gsap.fromTo(
        state.shaderMaterial.uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: TRANSITION_DURATION(),
          ease: "power2.inOut",
          onComplete: () => {
            if (state.shaderMaterial) {
              state.shaderMaterial.uniforms.uProgress.value = 0;
              state.shaderMaterial.uniforms.uTexture1.value = targetTexture;
              state.shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
            }
            state.isTransitioning = false;
            safeStartTimer(100);
          },
        }
      );
    };

    const createSlidesNavigation = () => {
      const nav = containerRef.current?.querySelector("#slidesNav");
      if (!nav) return;
      nav.innerHTML = "";
      slides.forEach((slide, i) => {
        const item = document.createElement("div");
        item.className = `slide-nav-item${i === 0 ? " active" : ""}`;
        item.dataset.slideIndex = String(i);
        item.innerHTML = `
          <div class="slide-progress-line"><div class="slide-progress-fill"></div></div>
          <div class="slide-nav-title font-mono text-[11px] uppercase tracking-wider">${slide.title}</div>
        `;
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          if (!state.isTransitioning && i !== state.currentSlideIndex) {
            stopAutoSlideTimer();
            quickResetProgress(state.currentSlideIndex);
            navigateToSlide(i);
          }
        });
        nav.appendChild(item);
      });
    };

    const loadImageTexture = (src: string) =>
      new Promise<any>((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        loader.load(
          src,
          (t: any) => {
            t.minFilter = t.magFilter = THREE.LinearFilter;
            t.userData = {
              size: new THREE.Vector2(t.image.width || 1920, t.image.height || 1080),
            };
            resolve(t);
          },
          undefined,
          reject
        );
      });

    const initRenderer = async () => {
      const canvas = canvasRef.current;
      if (!canvas || !containerRef.current) return;

      const width = containerRef.current.clientWidth || window.innerWidth;
      const height = containerRef.current.clientHeight || window.innerHeight;

      state.scene = new THREE.Scene();
      state.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      state.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      });
      state.renderer.setSize(width, height);
      state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      state.shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTexture1: { value: null },
          uTexture2: { value: null },
          uProgress: { value: 0 },
          uResolution: { value: new THREE.Vector2(width, height) },
          uTexture1Size: { value: new THREE.Vector2(1, 1) },
          uTexture2Size: { value: new THREE.Vector2(1, 1) },
          uEffectType: { value: getEffectIndex(effect) },
          uGlobalIntensity: { value: 1.0 },
          uSpeedMultiplier: { value: 1.0 },
          uDistortionStrength: { value: 1.0 },
          uColorEnhancement: { value: 1.0 },
          uGlassRefractionStrength: { value: 1.0 },
          uGlassChromaticAberration: { value: 1.0 },
          uGlassBubbleClarity: { value: 1.0 },
          uGlassEdgeGlow: { value: 1.0 },
          uGlassLiquidFlow: { value: 1.0 },
          uFrostIntensity: { value: 1.0 },
          uFrostCrystalSize: { value: 1.0 },
          uFrostIceCoverage: { value: 1.0 },
          uRippleFrequency: { value: 25.0 },
          uRippleAmplitude: { value: 0.08 },
          uRippleWaveSpeed: { value: 1.0 },
          uPlasmaIntensity: { value: 1.2 },
          uPlasmaSpeed: { value: 0.8 },
          uTimeshiftDistortion: { value: 1.6 },
        },
        vertexShader,
        fragmentShader,
      });

      state.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), state.shaderMaterial));

      for (const s of slides) {
        try {
          const tex = await loadImageTexture(s.media);
          state.slideTextures.push(tex);
        } catch {
          console.warn("Failed texture:", s.media);
        }
      }

      if (state.slideTextures.length >= 2) {
        state.shaderMaterial.uniforms.uTexture1.value = state.slideTextures[0];
        state.shaderMaterial.uniforms.uTexture2.value = state.slideTextures[1];
        state.shaderMaterial.uniforms.uTexture1Size.value = state.slideTextures[0].userData.size;
        state.shaderMaterial.uniforms.uTexture2Size.value = state.slideTextures[1].userData.size;
        state.texturesLoaded = true;
        state.sliderEnabled = true;

        containerRef.current?.classList.add("loaded");
        safeStartTimer(500);
      }

      let animationFrameId: number;
      const render = () => {
        animationFrameId = requestAnimationFrame(render);
        if (state.renderer && state.scene && state.camera) {
          state.renderer.render(state.scene, state.camera);
        }
      };
      render();

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    };

    createSlidesNavigation();
    updateCounter(0);

    const tEl = containerRef.current?.querySelector("#mainTitle");
    const dEl = containerRef.current?.querySelector("#mainDesc");
    if (tEl && dEl && slides[0]) {
      tEl.innerHTML = splitText(slides[0].title);
      dEl.textContent = slides[0].description;
      gsap.fromTo(
        tEl.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(dEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 });
    }

    initRenderer();

    const handleResize = () => {
      if (state.renderer && containerRef.current && state.shaderMaterial) {
        const w = containerRef.current.clientWidth || window.innerWidth;
        const h = containerRef.current.clientHeight || window.innerHeight;
        state.renderer.setSize(w, h);
        state.shaderMaterial.uniforms.uResolution.value.set(w, h);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoSlideTimer();
      window.removeEventListener("resize", handleResize);
      if (state.renderer) {
        state.renderer.dispose();
      }
    };
  }, [slides, effect, autoSlideSpeed]);

  return (
    <div
      ref={containerRef}
      className={`slider-wrapper relative w-full aspect-[16/11] sm:aspect-[16/9] md:aspect-[21/10] min-h-[480px] max-h-[640px] bg-[#0A0A0A] text-white overflow-hidden rounded-2xl border border-white/10 shadow-2xl select-none ${className}`}
    >
      <canvas ref={canvasRef} className="webgl-canvas absolute inset-0 w-full h-full object-cover" />

      {/* GRADIENT VIGNETTE */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />

      {/* TOP SLIDE COUNTER */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10 z-20 flex items-baseline gap-1.5 font-mono text-xs tracking-widest text-[#b5a898]">
        <span className="slide-number text-lg font-bold text-white" id="slideNumber">
          01
        </span>
        <span className="text-white/40">/</span>
        <span className="slide-total text-xs text-white/60" id="slideTotal">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* SLIDE CONTENT HERO */}
      <div className="slide-content absolute bottom-24 md:bottom-28 left-6 md:left-10 max-w-2xl z-20 pointer-events-none pr-6">
        {slides[activeIdx]?.category && (
          <span className="inline-block text-[9px] font-mono tracking-[0.3em] uppercase text-[#b5a898] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 mb-3">
            {slides[activeIdx].category}
          </span>
        )}
        <h1
          className="slide-title font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-normal leading-[1.14] tracking-tight mb-2.5 drop-shadow-md break-normal"
          id="mainTitle"
        ></h1>
        <p
          className="slide-description font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-xl drop-shadow"
          id="mainDesc"
        ></p>
      </div>

      {/* SLIDES NAVIGATION BAR AT BOTTOM */}
      <nav
        className="slides-navigation absolute bottom-6 left-6 right-6 md:bottom-8 md:left-10 md:right-10 z-30 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none"
        id="slidesNav"
      ></nav>
    </div>
  );
}

export default LuminaInteractiveList;
