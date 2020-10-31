<template>
  <div class="cont-box page-title">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="route in $route.matched"
        :key="route.meta.name"
        :to="{ path: route.path }">{{route.meta.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
