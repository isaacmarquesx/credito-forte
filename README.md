# Crédito Forte — Site Institucional

Site institucional da **Crédito Forte ESC**, Empresa Simples de Crédito de Feira de Santana/BA.

- **Domínio de produção**: https://creditoforte.com.br
- **Tecnologias**: React 19 + Vite 8 + Tailwind CSS (CDN) + Framer Motion

---

## 🚀 Desenvolvimento local

```bash
npm install
npm run dev
```

O Vite inicia em `http://localhost:3000`.

---

## 📦 Build de produção

```bash
npm run build
```

Gera a pasta `dist/` com os assets estáticos otimizados. Basta servir essa pasta
com qualquer servidor estático (Nginx, Apache, Caddy, etc.).

Para preview local do build:
```bash
npm run preview
```

---

## 🌐 Deploy em VPS (Ubuntu + Nginx)

### 1. Pré-requisitos na VPS
- Ubuntu 22.04+ com acesso SSH
- Domínio `creditoforte.com.br` apontado (registro A) para o IP da VPS
- Porta 80 e 443 liberadas no firewall

### 2. Instalar Node.js, Nginx e Certbot

```bash
sudo apt update && sudo apt upgrade -y

# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Nginx + Certbot (HTTPS gratuito via Let's Encrypt)
sudo apt install -y nginx certbot python3-certbot-nginx git
```

### 3. Clonar o repositório e fazer o build

```bash
cd /var/www
sudo git clone https://github.com/SEU_USUARIO/credito-forte.git creditoforte
sudo chown -R $USER:$USER /var/www/creditoforte
cd creditoforte
npm install
npm run build
```

### 4. Configurar o Nginx

Criar `/etc/nginx/sites-available/creditoforte`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name creditoforte.com.br www.creditoforte.com.br;

    root /var/www/creditoforte/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(png|jpg|jpeg|svg|ico|webp)$ {
        expires 30d;
        add_header Cache-Control "public";
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/javascript application/javascript application/json image/svg+xml;
}
```

Ativar:

```bash
sudo ln -s /etc/nginx/sites-available/creditoforte /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. HTTPS com Let's Encrypt

```bash
sudo certbot --nginx -d creditoforte.com.br -d www.creditoforte.com.br
```

Renovação é automática.

### 6. Atualizações futuras

```bash
cd /var/www/creditoforte
git pull
npm install
npm run build
sudo systemctl reload nginx
```

---

## 🏢 VPS recomendadas (Brasil)

| Provedor | Preço | Observação |
|---|---|---|
| **Hostinger VPS** | ~R$ 15/mês | Brasil, suporte em PT-BR |
| **Vultr São Paulo** | $2.50/mês | Latência baixa no Brasil |
| **DigitalOcean** | $4/mês | Documentação excelente |
| **Contabo** | €5/mês | Melhor custo-benefício global |

---

## ⚠️ Notas técnicas

1. **Tailwind CDN**: o `index.html` usa `cdn.tailwindcss.com`. Para produção
   séria, migrar para o plugin Vite oficial e empacotar o CSS no bundle.
2. **Imagem do Hero**: atualmente usa URL externa do Google. Substitua por
   uma imagem hospedada localmente em `public/images/` antes do deploy final.

---

## 📞 Contato

- **Site**: https://creditoforte.com.br
- **WhatsApp**: (75) 99145-1005
- **E-mail**: comercial@creditoforte.com.br
- **Instagram**: [@creditoforte](https://www.instagram.com/creditoforte)
