import { Component, inject } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { TipoVenda } from '../../models/tipo-venda';

@Component({
  selector: 'app-venda',
  standalone: true,
  imports: [],
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css'],
})
export class VendaComponent {
  protected service = inject(ProdutoService);
  protected produtos = this.service.produtos;

  protected subtotal = this.service.subtotal;
  protected desconto = this.service.desconto;
  protected totalFinal = this.service.totalFinal;

  protected onTipoChange(evento: Event): void {
    const tipo = (evento.target as HTMLSelectElement).value as TipoVenda;
    this.service.alterarTipoVenda(tipo);
  }

  protected onCheckboxChange(id: number, evento: Event): void {
    const checked = (evento.target as HTMLInputElement).checked;
    if (checked) {
      this.service.selecionarProduto(id);
    } else {
      this.service.removerProduto(id);
    }
  }

  protected onQuantidadeChange(id: number, evento: Event): void {
    const qtd = Number((evento.target as HTMLInputElement).value);
    this.service.alterarQuantidade(id, qtd);
  }

  protected emitirVenda(): void {
    const resumo = this.service.resumoVenda();
    console.log('Venda emitida:', resumo);
    alert('Venda registrada! Abra o console (F12).');
  }
}
