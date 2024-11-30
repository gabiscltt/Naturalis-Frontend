import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  @ViewChild('carouselInner') carouselInner!: ElementRef;

  carouselItems = [
    { 
      image: 'userIcon.png', 
      text: '“Trocar para cosméticos veganos melhorou minha pele em apenas 2 semanas!” <br> – Ana'
    },
    { 
      image: 'Produto_Serum_Calmante_ChaVerde.png', 
      text: 'Mantenha sua pele hidratada neste inverno com nossos séruns hidratantes.'
    },
    { 
      image: 'reciclar.png', 
      text: 'Nossa embalagem agora é 100% reciclável! Junte-se ao movimento zero desperdício.'
    },
    { 
      image: 'userIcon2.png', 
      text: '“Eu amo como o sérum glow é suave e eficaz!” <br> – Maria'
    },
    { 
      image: 'Produto_ProtetorSolar_Mate.png', 
      text: 'Prepare-se para o verão com nossos protetores solares leves e não oleosos!'
    }
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