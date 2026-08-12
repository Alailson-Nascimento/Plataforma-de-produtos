import { Component } from '@angular/core';
import { ListaComponent } from './components/lista/lista.component';
import { VendaComponent } from './components/venda/venda.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaComponent, VendaComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  protected title = 'Plataforma de Produtos';
}
