<div align="center">
  <h1>Copacabana - Casa Brasileira</h1>
</div>

O **Copacabana** é um projeto desenvolvido com foco em apresentar a **Linha Copacabana - Casa Brasileira**, em que representa a essência da LinhaCopacabana.
  
---

## Índice

- [Sobre](#sobre)
- [Visualização](#visualizacao)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Como Executar o Projeto](#como-executar-o-projeto)

---

<h2 id="sobre">Sobre:</h2>

A proposta do projeto é um tributo ao Rio de Janeiro. Nesse projeto, é mostrado um pouco sobre a linha e seus produtos.

---


<h2 id="visualizacao">Visualização:</h2>

<img width="400" alt="image" src="https://github.com/user-attachments/assets/08710768-93ae-40a2-9079-f6129de623ba" />
<img width="400" alt="image" src="https://github.com/user-attachments/assets/934f80a8-feb8-44bf-a3dc-301c3c27bc0c" />
<img width="400" alt="image" src="https://github.com/user-attachments/assets/08266c85-3706-4927-b32d-7cfea9cb2d17" />
<img width="400" alt="image" src="https://github.com/user-attachments/assets/7e6db4ca-351e-4f47-bff7-1e7ef35ef4b9" />

---

<h2 id="tecnologias-utilizadas">Tecnologias Utilizadas:</h2>

### Front-end:
- **React (^19.0.0)**: biblioteca para construção de interfaces de usuário baseadas em componentes
- **TypeScript (~5.7.2)**: adiciona tipagem estática ao JavaScript, aumentando a segurança e manutenção do código
- **Vite (^6.2.0)**: ferramenta de build e ambiente de desenvolvimento rápido
- **Happy Dom(^17.4.4)**: simula um navegador sem interface gráfica 

### Estilização:
- **Tailwind CSS (3.4)**: framework utilitário para estilização rápida e responsiva
- **PostCSS (^8.5.3)**: processador de CSS utilizado em conjunto com Tailwind
- **Autoprefixer (^10.4.21)**: adiciona automaticamente prefixos CSS para compatibilidade entre navegadores

### UI e experiência do usuário:
- **GSAP (^3.12.7)**: biblioteca para criação de animações avançadas
- **Lenis (^1.2.3)**: implementação de rolagem suave (smooth scrolling)
- **Yet-another-react-lightbox (^3.25.0)**: exibição de imagens em modal

---

<h2 id="arquitetura-do-projeto">Arquitetura principal do Projeto:</h2>

```bash
Copacabana-CB
│
├── public             # Arquivos públicos servidos diretamente
├── src                # Pasta principal
│   ├── Components     # Componentes responsáveis pela construção da interface 
│   ├── Data           # Lista com conteúdos estáticos para os componentes (imagens)
│   ├── Layouts        # Estruturas que definem o padrão das páginas
│   ├── Types          # Tipagens compartilhadas entre componentes
│   ├── assets         # Recursos estáticos utilizados na interface
│   ├── pages          # Páginas principais do site
├── App.tsx            # Responsável por centralizar rotas e contexts
├── index.css          # Arquivo global de estilos
├── main.tsx           # Ponto de entrada do projeto React
│

```

---

<h2 id="como-executar-o-projeto">Como Executar o Projeto:</h2>

1. Clone o repositório:

```bash
git clone https://github.com/RafaLaste/Copacabana-CB.git
cd Copacabana-CB
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o projeto:
```bash
npm run dev
```


