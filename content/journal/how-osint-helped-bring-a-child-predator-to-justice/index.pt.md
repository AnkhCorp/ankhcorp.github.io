---
title: "Como a Inteligência de Fontes Abertas Ajudou a Levar um Criminoso Pedófilo à Justiça"
draft: true
description: "Um estudo de caso real de OSINT: como URLScan, Censys e correlação de usuários entre plataformas mapearam a infraestrutura de um criminoso e levaram a uma prisão via cooperação jurídica."
date: 2025-12-09
author: Andre Rocha
tags: ["OSINT"]
image: "/images/ankh.png"
---

## 1. O Ponto de Partida: Associando Ativos

Uma investigação começou com um site primário (Site A) suspeito de hospedar material ilegal. Este site era protegido pelo Cloudflare, mascarando seu verdadeiro IP de servidor. O primeiro passo foi encontrar dados históricos ou ativos associados.

Técnica e Ferramenta: Análise Histórica de Domínio
Usamos o URLScan.io (especificamente sua API de busca: https://urlscan.io/api/v1/search/?q=domain:[TARGET_DOMAIN]&size=10000) para encontrar varreduras históricas, subdomínios e infraestrutura relacionada ao alvo. Essa busca revelou um domínio mais antigo e relacionado (Site B) que era usado anteriormente para o mesmo conteúdo, mas não estava mais atrás do Cloudflare.

## 2. Expandindo o Alcance: Correlação de IP e Hospedagem

O domínio mais antigo (Site B) forneceu uma pista crucial: seu endereço IP de origem. Esse IP era um ponto de pivô fundamental.

Técnica e Ferramenta: Reverse IP e Consulta de Hospedagem
Pegamos o IP descoberto e o consultamos no Censys (search.censys.io). Esse mecanismo de busca de dispositivos de internet confirmou o provedor de hospedagem e, criticamente, listou outro domínio (Site C) hospedado no mesmo servidor. Também usamos o URLScan.io novamente, desta vez buscando pelo endereço IP, para encontrar outros domínios apontando para ele. A comparação visual e estrutural dos Sites A, B e C confirmou a propriedade comum.

## 3. Agregação de Perfis: Conectando Identidades Digitais

Com vários domínios ligados a um mesmo operador, o próximo passo era encontrar seus perfis públicos.

Técnica: Correspondência de Usuários entre Plataformas
Uma página de suporte em um dos sites listava um nome de usuário de contato do Telegram. A busca por esse usuário levou a um perfil público. Nesse perfil, o indivíduo compartilhava um link de convite para um servidor do Discord. Nas informações públicas desse servidor, o domínio antigo (Site B) estava listado, criando um vínculo verificado entre as identidades digitais e os ativos web.

## 4. Postura de Segurança e Avaliação de Vulnerabilidades

Entender a configuração técnica pode informar sobre a consciência de segurança do operador.

Técnica e Ferramenta: Varredura de Vulnerabilidades de CMS
Os sites eram construídos em WordPress. Usamos o WPScan (o scanner de segurança do WordPress) para enumerar plugins, temas e usuários. A varredura identificou um plugin desatualizado com uma vulnerabilidade conhecida. Consultamos o banco de dados CVE do Mitre (cve.mitre.org) para obter detalhes da vulnerabilidade específica (ex.: CVE-2025-22738), confirmando que se tratava de uma falha de Cross-Site Scripting (XSS).

## 5. As Contramedidas do Operador

A investigação observou que o operador havia migrado o site primário (Site A) para atrás do Cloudflare, indicando uma tentativa de esconder o servidor de origem após a exposição do IP antigo — um passo comum de OPSEC.

Ferramentas-Chave Usadas Neste Cenário:

URLScan.io: para análise histórica de domínios, encontrar infraestrutura relacionada e consultas reverse IP.

Censys.io: para análise profunda de endereços IP, portas abertas e certificados de hospedagem.

WPScan: para enumerar e avaliar a segurança de sites baseados em WordPress.

Banco de Dados CVE do Mitre: para pesquisar e confirmar detalhes de vulnerabilidades conhecidas.

Mecanismos de Busca Públicos e Funções de Busca de Plataformas: para correlacionar usuários entre Telegram, Discord e outras plataformas sociais.

Lições de OSINT Reforçadas:

Encadeamento de Ferramentas: o poder do OSINT vem de usar ferramentas em sequência. A cadeia foi: URLScan (histórico) -> Censys (correlação de IP/domínio) -> Revisão manual (padrões) -> WPScan (avaliação de vulnerabilidades).

Pivô é Essencial: um endereço IP exposto é uma mina de ouro. Ferramentas como Censys e URLScan são especializadas em revelar o que mais está conectado a ele.

Informação Pública Está em Todo Lugar: servidores comunitários do Discord, bios públicas do Telegram e até páginas de erro de sites (que podem revelar o provedor de hospedagem) contêm dados valiosos e conectáveis.

Limites Éticos: todas as informações foram coletadas de fontes e interfaces publicamente acessíveis. Nenhum sistema foi acessado sem autorização. Esta pesquisa foi conduzida para entender atribuição e infraestrutura, não para explorar vulnerabilidades.

Este estudo de caso demonstra como uma combinação de scanners especializados e correlação manual persistente de dados públicos pode mapear a pegada digital de um alvo, destacando tanto a metodologia quanto as ferramentas específicas que tornam isso possível.

## Nota Final Importante

Este estudo de caso não é um exercício teórico. Ele documenta técnicas reais de OSINT aplicadas a uma investigação genuína sobre a distribuição de material ilegal. As evidências reunidas por esses métodos foram compiladas em um relatório formal e entregues aos órgãos de aplicação da lei competentes, incluindo a Polícia Federal brasileira.

Como resultado direto desta investigação e da subsequente cooperação jurídica internacional, o indivíduo que operava esses sites foi identificado, localizado e preso no México. Os provedores de hospedagem foram notificados formalmente, levando à remoção do conteúdo ilegal e à derrubada dos domínios associados.

Este resultado reforça um princípio fundamental: o poder da Inteligência de Fontes Abertas (OSINT) não está no vigilantismo, mas em sua capacidade de fornecer pistas acionáveis e baseadas em evidências às autoridades competentes. OSINT ético, conduzido dentro de estruturas legais, é uma ferramenta vital para apoiar a aplicação da lei, proteger os vulneráveis e responsabilizar atores maliciosos.

Este post serve para educar sobre metodologia e ferramentas, com a esperança de capacitar outras pessoas a usar essas habilidades de forma responsável pelo bem comum.
