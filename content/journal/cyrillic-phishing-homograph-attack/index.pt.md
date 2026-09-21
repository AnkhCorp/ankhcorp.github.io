---
title: "Phishing Cirílico: Quando o Domínio Parece Legítimo"
description: "Como um único caractere Unicode trocado transforma um domínio familiar no domínio de um atacante — e as checagens rápidas que pegam isso antes do clique."
date: 2026-01-13
author: "ANKHCORP"
image: "/images/ankh.png"
tags: ["Phishing", "Red Team", "DNS", "Unicode"]
---

Um desenvolvedor da Apple — dez anos lendo e-mails oficiais da empresa, do tipo que não clica em nada — quase caiu numa mensagem de phishing recentemente. Não porque o e-mail fosse bem escrito. Não era. O domínio é que *parecia* certo.

Ele fez a única coisa que a maioria não faz: inspecionou caractere por caractere. Uma das letras não era do alfabeto que dizia ser.

## O 'a' que não é um 'a'

O `a` latino é U+0061. O `а` cirílico é U+0430. Os dois são renderizados de forma idêntica em praticamente qualquer tamanho e qualquer fonte. Lado a lado — a а — mesmo num bom monitor você não aponta o falso.

Só que o DNS não lê formas. Lê code points. Um domínio construído com o caractere cirílico é um domínio completamente diferente nos livros da internet: registrado pelo atacante, resolvendo para o servidor do atacante — e totalmente elegível para um certificado TLS válido, cadeado e tudo.

Esse é o ataque de homógrafo IDN. Sem exploit, sem zero-day. Abusa a diferença entre como humanos leem (formas de palavras) e como computadores leem (bytes).

## Por que a mensagem ainda parecia estranha

O domínio passou no teste visual, mas o e-mail tinha as pistas de sempre, que você começa a notar depois de ler alguns centena delas:

- Nunca usava o nome dele.
- Não mencionava nenhuma conta, pedido ou aplicativo específico.
- O texto ficava genérico, mas ainda soava "da marca".

Esse equilíbrio é proposital. Especificidade cria fatos, e fatos podem estar errados — um fato errado derruba o esquema inteiro. Urgência genérica mais um remetente com cara de confiável custa menos e funciona mais.

## Conferindo um domínio sem confiar nos olhos

O olho é a ferramenta errada aqui. Uma checagem de segundos:

```console
$ python3 -c "print(any(ord(c) > 127 for c in 'аpple.com'))"
True
```

No navegador, olhe o punycode: domínios IDN com scripts misturados aparecem como `xn--...` na barra de endereço em vários browsers. Se vir esse prefixo num domínio que não tem nada a ver com isso, feche a aba.

O `whois` completa o quadro: registrante e idade do domínio geralmente contam a história inteira.

## Por que isso continua funcionando

Humanos leem palavras como formas — é por isso que dá para ler um parágrafo com as letras embaralhadas dentro das palavras. Os browsers melhoraram (a maioria hoje avisa ou mostra o punycode em domínios com scripts misturados), mas as regras de exibição variam, e o certificado nunca te salvou mesmo: o cadeado só diz que a conexão é criptografada *até quem é o dono do domínio*. Nunca disse quem é esse dono.

Se alguém com uma década de exposição aos e-mails reais de uma marca hesita por um segundo, todo mundo abaixo dessa linha é alvo justo. A técnica é silenciosa, não custa nada e escala.

Então a lição não é "olhe com mais atenção". É: deixe as máquinas fazerem a checagem em nível de caractere — seus olhos são exatamente o alvo desse ataque.
