import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent {
  // inject() pega o Service automaticamente — não precisa de constructor
  protected service = inject(ProdutoService);
  protected produtos = this.service.produtos;

  protected atualizarPreco(id: number, evento: Event): void {
    const valor = Number((evento.target as HTMLInputElement).value);
    this.service.alterarPreco(id, valor);
  }

  protected atualizarEstoque(id: number, evento: Event): void {
    const valor = Number((evento.target as HTMLInputElement).value);
    this.service.alterarEstoque(id, valor);
  }
}
