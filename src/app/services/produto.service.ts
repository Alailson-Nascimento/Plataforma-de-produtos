import { Injectable, signal, computed, effect } from '@angular/core';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Produto } from '../models/produto';
import { TipoVenda } from '../models/tipo-venda';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  // ========== Writable Signals (Aula 09 p.25) ==========
  // O PDF usa protected readonly nos signals
  readonly produtos = signal<Produto[]>(this.gerarProdutos());

  readonly tipoVenda = signal<TipoVenda>('B2C');

  // ========== Computed Signals (Aula 09 p.26-27) ==========
  readonly subtotal = computed(() => {
    let total = 0;

    for (const produto of this.produtos()) {
      if (produto.selecionado) {
        total += produto.preco * produto.quantidade;
      }
    }

    return total;
  });

  readonly desconto = computed(() => {
    if (this.tipoVenda() === 'B2B') {
      return this.subtotal() * 0.15;
    }

    return 0;
  });

  readonly totalFinal = computed(() => {
    return this.subtotal() - this.desconto();
  });

  // ========== Effect (Aula 09 p.28) ==========
  constructor() {
    effect(() => {
      console.log('Produtos atualizados:', this.produtos());
    });
  }

  // ========== Gerar produtos com Faker (Aula 08 pt1) ==========
  private gerarProdutos(): Produto[] {
    const nomes = [
      'Notebook',
      'Mouse',
      'Teclado',
      'Monitor',
      'Headset',
      'Webcam',
      'Mesa',
      'Cadeira',
    ];

    const produtos: Produto[] = [];

    for (let i = 1; i <= 8; i++) {
      produtos.push({
        id: i,
        nome: faker.helpers.arrayElement(nomes),
        preco: Number(faker.commerce.price({ min: 50, max: 3000 })),
        estoque: faker.number.int({ min: 5, max: 100 }),
        selecionado: false,
        quantidade: 1,
      });
    }

    return produtos;
  }

  // ========== Metodos para alterar os Signals ==========

  alterarPreco(id: number, novoPreco: number): void {
    this.produtos.update((lista) => {
      return lista.map((produto) => {
        if (produto.id === id) {
          return { ...produto, preco: novoPreco };
        }
        return produto;
      });
    });
  }

  alterarEstoque(id: number, novoEstoque: number): void {
    this.produtos.update((lista) => {
      return lista.map((produto) => {
        if (produto.id === id) {
          return { ...produto, estoque: novoEstoque };
        }
        return produto;
      });
    });
  }

  alterarQuantidade(id: number, quantidade: number): void {
    this.produtos.update((lista) => {
      return lista.map((produto) => {
        if (produto.id === id) {
          return { ...produto, quantidade: quantidade };
        }
        return produto;
      });
    });
  }

  selecionarProduto(id: number): void {
    this.produtos.update((lista) => {
      return lista.map((produto) => {
        if (produto.id === id) {
          return { ...produto, selecionado: true };
        }
        return produto;
      });
    });
  }

  removerProduto(id: number): void {
    this.produtos.update((lista) => {
      return lista.map((produto) => {
        if (produto.id === id) {
          return { ...produto, selecionado: false, quantidade: 1 };
        }
        return produto;
      });
    });
  }

  alterarTipoVenda(tipo: TipoVenda): void {
    this.tipoVenda.set(tipo);
  }

  // ========== Resumo da venda ==========
  resumoVenda() {
    const produtosSelecionados: Produto[] = [];

    for (const produto of this.produtos()) {
      if (produto.selecionado) {
        produtosSelecionados.push(produto);
      }
    }

    return {
      tipo: this.tipoVenda(),
      produtos: produtosSelecionados,
      subtotal: this.subtotal(),
      desconto: this.desconto(),
      total: this.totalFinal(),
    };
  }
}
