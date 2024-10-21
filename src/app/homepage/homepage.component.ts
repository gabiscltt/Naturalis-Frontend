import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  @ViewChild('carouselInner') carouselInner!: ElementRef;

  carouselItems = [
    { image: 'assets/news1.png', text: 'News 1 text' },
    { image: 'assets/news2.png', text: 'News 2 text' },
    { image: 'assets/news3.png', text: 'News 3 text' },
    { image: 'assets/news4.png', text: 'News 4 text' },
    { image: 'assets/news5.png', text: 'News 5 text' }
  ];

  currentPage = 0;

  ngAfterViewInit() {
    const carouselInnerElement = this.carouselInner.nativeElement;
    setInterval(() => {
      this.currentPage++;
      if (this.currentPage >= this.carouselItems.length) {
        this.currentPage = 0;
      }
      carouselInnerElement.style.transform = `translateX(-${this.currentPage * 20}%)`;
    }, 3000);
  }

  prevSlide() {
    this.currentPage--;
    if (this.currentPage < 0) {
      this.currentPage = this.carouselItems.length - 1;
    }
    this.carouselInner.nativeElement.style.transform = `translateX(-${this.currentPage * 20}%)`;
  }

  nextSlide() {
    this.currentPage++;
    if (this.currentPage >= this.carouselItems.length) {
      this.currentPage = 0;
    }
    this.carouselInner.nativeElement.style.transform = `translateX(-${this.currentPage * 20}%)`;
  }
}