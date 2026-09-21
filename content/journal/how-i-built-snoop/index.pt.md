---
title: "Como Construí o Snoop: Uma Ferramenta OSINT para Rastrear Usuários pela Internet"
draft: false
description: "Uma ferramenta leve de enumeração de usuários que utiliza espelhos simples e códigos de status HTTP para rastrear nomes de usuário de forma confiável pela internet."
date: 2026-09-21
author: Andre
tags: ["OSINT"]
image: "/images/ankh.png"
---

Rastrear nomes de usuário em várias plataformas é uma das tarefas mais comuns em OSINT. Parece simples, mas as plataformas vivem mudando seu comportamento, removendo códigos de erro, bloqueando requisições automatizadas e escondendo respostas de rede úteis. Por causa disso, muitas ferramentas conhecidas acabam quebrando ou retornando falsos positivos.

Foi exatamente por isso que construí o Snoop - uma ferramenta leve e focada de enumeração de usuários que usa uma abordagem não convencional: aproveitar serviços de terceiros para restaurar a capacidade de detectar a existência de um usuário através das respostas HTTP.

Este post explica o raciocínio que utilizei por trás da ferramenta, e por que esse método funcionou melhor para mim.

# A ideia principal por trás do Snoop

Em vez de enviar requisições ao site oficial da rede social, o Snoop usa frontends de terceiros, como o Nitter para o Twitter/X.

```py
    if platform == "instagram":
        url = f"https://imginn.com/{username}/"
        display_url = f"https://instagram.com/{username}"
    elif platform == "twitter":
        url = f"https://nitter.privacydev.net/{username}"
        display_url = f"https://x.com/{username}"
```

Pensei em fazer a ferramenta dessa forma depois de perceber que algumas ferramentas clássicas não estavam funcionando corretamente, então pensei: E se eu utilizasse plataformas de terceiros para fazer as requisições HTTP ao invés dos sites clássicos.

> Por quê?

Muitas plataformas removeram essa lógica, mas os frontends alternativos ainda a mantêm. Essa é uma forma rápida que encontrei para utilizar no Snoop, utilizando a gambiarra brasileira.

Se o usuário não existe → retorna 404

Se o usuário existe → retorna 200

Isso torna o OSINT muito mais fácil e preciso.


## Como o Snoop funciona

A ferramenta é muito simples:

```md
- Ela monta uma lista de sites.
- Para cada um, substitui o nome de usuário na URL.
- Envia uma requisição HTTP normal.
- Verifica o código de status (principalmente 200 ou 404).
```

Como o Snoop usa espelhos da internet, ele evita os problemas que outras ferramentas enfrentam hoje.

Conforme o tempo passou, fui adaptando a ferramenta e adicionando formas diferentes.

O exemplo abaixo mostra uma das formas que encontramos de realizar requests. 

```md
- https://publish.x.com/oembed?url=https://x.com/elonmusk -> 200
- https://publish.x.com/oembed?url=https://x.com/usuarioquenaoexiste123xyz -> 404
```

No geral, sempre adiciono APIs e formas diferentes. Por causa disso, sempre preciso ficar renovando o código. Mas, se você tiver mais ideias de como melhorar a ferramenta ou adicionar mais serviços, o código-fonte se encontra abaixo:

> Código-fonte https://github.com/AnkhCorp/Snoop
