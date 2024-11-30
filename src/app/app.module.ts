import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductService } from './services/item-service.service';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarrinhoComponent } from './carrinho/carrinho/carrinho.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FinalizarCompraComponent } from './finalizarCompra/finalizar-compra/finalizar-compra.component';
import { ArtigosComponent } from './artigos/artigos/artigos.component';
import { UserPageComponent } from './userPage/user-page/user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomepageComponent,
    ProdutosComponent,
    CarrinhoComponent,
    FinalizarCompraComponent,
    ArtigosComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
