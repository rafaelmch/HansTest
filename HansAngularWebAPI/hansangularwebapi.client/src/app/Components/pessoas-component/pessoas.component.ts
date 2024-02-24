import { PessoasService } from './../../Pessoas.Services';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pessoa } from './../../Pessoa';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css'],
})
export class PessoasComponent implements OnInit {
  formulario: FormGroup = new FormGroup({
    nome: new FormControl(null),
    sobrenome: new FormControl(null),
    idade: new FormControl(null),
    profession: new FormControl(null),
  });
  tituloFormulario: string = '';
  pessoas: Pessoa[] = [];
  nomePessoa: string = '';
  pessoaId: number = 0;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  modalRef: BsModalRef | undefined;

  constructor(private pessoasService: PessoasService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.carregarPessoas();
    this.inicializarFormulario();
  }

  carregarPessoas(): void {
    this.pessoasService.PegarTodos().subscribe(
      (resultado) => {
        this.pessoas = resultado;
      },
      (error) => {
        console.error('Erro ao carregar pessoas:', error);
      }
    );
  }
    inicializarFormulario(): void {
      this.formulario = new FormGroup({
        pessoaId: new FormControl(null),
        nome: new FormControl(null),
        sobrenome: new FormControl(null),
        idade: new FormControl(null),
        profession: new FormControl(null),
      });
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Nova Pessoa';
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profession: new FormControl(null),
    });
  }

  ExibirFormularioAtualizacao(pessoaId : number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.pessoasService.PegarPeloId(pessoaId).subscribe((resultado) => {
      this.tituloFormulario = `Atualizar ${resultado.nome} ${resultado.sobrenome}`;

      this.formulario = new FormGroup({
        pessoaId: new FormControl(resultado.pessoaId),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobrenome),
        idade: new FormControl(resultado.idade),
        profession: new FormControl(resultado.profession),
      });
    });
  }

  EnviarFormulario(): void {
    const pessoa: Pessoa = this.formulario.value;

    if (pessoa.pessoaId > 0) {
      this.pessoasService.AtualizarPessoa(pessoa).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Pessoa atualizada com sucesso');
        this.pessoasService.PegarTodos().subscribe((registros) => {
          this.pessoas = registros;
        });
      });
    } else {
      this.pessoasService.SalvarPessoa(pessoa).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Pessoa inserida com sucesso');
        this.pessoasService.PegarTodos().subscribe((registros) => {
          this.pessoas = registros;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(pessoaId: number, nomePessoa: string, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.nomePessoa = nomePessoa;
  }

  ExcluirPessoa(pessoaId: number) {
    this.pessoasService.ExcluirPessoa(pessoaId).subscribe(resultado => {
      this.modalRef?.hide();
      alert('Pessoa excluída com sucesso');
      this.pessoasService.PegarTodos().subscribe(registros => {
        this.pessoas = registros;
      });
    });
  }
}
