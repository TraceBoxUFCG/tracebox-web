<script setup lang="ts">
const links = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'lucide:house',
    children: []
  },
  {
    title: 'Fornecedores',
    to: '/suppliers',
    icon: 'lucide:users-round',
    children: []
  },
  {
    title: 'Catálogo',
    icon: 'lucide:notebook',
    children: [
      {
        title: 'Produtos',
        to: '/catalog/product',
        icon: 'lucide:apple'
      },
      {
        title: 'Variedades',
        to: '/catalog/variety',
        icon: 'lucide:layout-grid'
      }
    ]
  },
  {
    title: 'Assets',
    to: '/assets',
    icon: 'lucide:box',
    children: []
  },
  {
    title: 'Compras',
    icon: 'lucide:baggage-claim',
    children: [
      {
        title: 'Ordens de Compra',
        to: '/purchases/purchase_order',
        icon: 'lucide:archive'
      },
      {
        title: 'Criar Ordem de Compra',
        to: '/purchases/new/',
        icon: 'lucide:notebook-pen'
      }
    ]
  }
]

const accountLinks = [
  {
    title: 'Perfil',
    icon: 'lucide:user'
  },
  {
    title: 'Ajustes',
    icon: 'lucide:settings'
  },
  {
    title: 'Sair',
    icon: 'lucide:log-out'
  }
]
</script>

<template>
  <aside
    class="fixed flex h-screen w-16 flex-col gap-2 border-r bg-muted/40 transition-[width] lg:w-60"
  >
    <RouterLink
      to="/ "
      class="flex h-16 shrink-0 items-center justify-between gap-1 border-b px-2 lg:px-4"
    >
      TraceBox
    </RouterLink>

    <nav class="relative flex h-full flex-col justify-between gap-2">
      <div>
        <SideBarLinks :routes="links" />
      </div>

      <div class="border-y bg-background py-3 text-center">
        <SideBarLinks :routes="accountLinks" />
      </div>
    </nav>
  </aside>
</template>
