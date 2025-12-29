import { OwlOptions } from "ngx-owl-carousel-o";

export function getOwlOptions(options?:OwlOptions) :OwlOptions {
    return {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplaySpeed:options?.autoplaySpeed? options.autoplaySpeed : 1000,
    autoplayTimeout:options?.autoplayTimeout? options.autoplayTimeout : 3500,
    slideTransition:"linear",
    responsive: options?.responsive? options.responsive : {},
    nav: false,
    items: options?.items? options?.items: 0
  };
}
