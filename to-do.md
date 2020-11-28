# Recuperação de senha

**RF - Requisítos Funcionais**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder alterar sua senha;

**RNF - Requisítos não Funcionais**

- Utilizar `Mailtrap` para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano(Background Job);

**RN - Regras de negócio**

- O link enviado por e-mail deve expirar em 2 horas;
- O usuário precisa confirmar a nova senha, digitando duas vezes;

# Atualização do Perfil

**RF - Requisítos Funcionais**

- O usuário deve poder atualizar seu perfil;
  - Nome;
  - Email;
  - Senha;

**RN - Regras de negócio**

- O usuário não pode alterar seu e-mail para um email já utilizado por outro usuário;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF - Requisítos Funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF - Requisítos não Funcionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN - Regras de negócio**

- A notificação deve ter um status de lida ou não lida;

# Agendamento de serviços

**RF - Requisítos Funcionais**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com os horários disponíveis de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF - Requisítos não Funcionais**

- A listagem de prestadores deve ser armazenada em cache;

**RN - Regras de negócio**

- Cada agendamento deve durar 1 hora;
- Os agendamentos devem está disponível entre as 8hrs às 18hrs;
- O usuário não pode agendar em umk horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
