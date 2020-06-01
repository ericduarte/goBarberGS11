# Recuperação de Senha

**RF**
- O usuário deve poder recuperar sua senha informando o seu email
- O usuário deve receber um email com instruções de recuperação de senha
- O usuário deve poder resetar sua senha

**RNF**

- Utilizar mailtrap para testa envio de email em desenvolvimento
- Utilizar Amazon SES pars envio de emails em produção
- O envio de emails deve acontece em segundo plano(background job)

**RN**

- O link enviado por email para resetar senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha a resetá-la

# Atualização do Perfil

**RF**

- O usuário deve poder alterar seu nome email e senha

**RN**

- O usuário não pode alterar seu email para um email já utilizado por outro
- Para alterar sua senha o usuário deve informar sua senha antiga
- Para atualizar sua senha o usuário deve confirmá-la

# Painel de Controle
**RF**
- O usuário deve poder listar seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidades
**RNF**
- Os agendamentos do prestador no dia devem ser armazenados em cache
- As notifições do prestador devem ser armazanadas no mongodb
- As notificação do prestador devem ser enviadas em tempo real usando Socket.io

**RN**
- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar

# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviçes cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador
- O usuário deve poder realizar um novo agendamento com um prestador

**RNF**

- A listagem de prestadores deve ser armazenada em cache

**RN**

- Cada agentamento deve durar 1h exatamente
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro horário as 8h último às 17h).
- O usuário não pode agendar em um horário já ocupado
- O usuário não pode agendar num horário que já passou
- O usuário não pode agendar serviços consigo mesmo
