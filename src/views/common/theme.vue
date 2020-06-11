<template>
  <el-form>
    <h2>布局设置</h2>
    <el-form-item label="导航条类型">
      <el-radio-group v-model="navbarLayoutType">
        <el-radio label="default" border>default</el-radio>
        <el-radio label="inverse" border>inverse</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="导航条颜色">
      <el-radio-group v-model="navbarLayoutColor">
        <el-radio label="color1">
          <span class="colorSpan" style="background:#0bb2d4"></span>
        </el-radio>
        <el-radio label="color2">
          <span class="colorSpan" style="background:#3e8ef7"></span>
        </el-radio>
        <el-radio label="color3">
          <span class="colorSpan" style="background:#409eff"></span>
        </el-radio>
        <el-radio label="color4">
          <span class="colorSpan" style="background:#667afa"></span>
        </el-radio>
        <el-radio label="color5">
          <span class="colorSpan" style="background:#997b71"></span>
        </el-radio>
        <el-radio label="color6">
          <span class="colorSpan" style="background:#9463f7"></span>
        </el-radio>
        <el-radio label="color7">
          <span class="colorSpan" style="background:#757575"></span>
        </el-radio>
        <el-radio label="color8">
          <span class="colorSpan" style="background:#eb6709"></span>
        </el-radio>
        <el-radio label="color9">
          <span class="colorSpan" style="background:#f74584"></span>
        </el-radio>
        <el-radio label="color10">
          <span class="colorSpan" style="background:#fcb900"></span>
        </el-radio>
        <el-radio label="color11">
          <span class="colorSpan" style="background:#ff4c52"></span>
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="侧边栏类型">
      <el-radio-group v-model="sidebarLayoutSkin">
        <el-radio label="light" border>light</el-radio>
        <el-radio label="dark" border>dark</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="侧边栏颜色">
      <el-radio-group v-model="sidebarLayoutSkinColor">
        <el-radio label="color1">
          <span class="colorSpan" style="background:#0bb2d4"></span>
        </el-radio>
        <el-radio label="color2">
          <span class="colorSpan" style="background:#3e8ef7"></span>
        </el-radio>
        <el-radio label="color3">
          <span class="colorSpan" style="background:#409eff"></span>
        </el-radio>
        <el-radio label="color4">
          <span class="colorSpan" style="background:#667afa"></span>
        </el-radio>
        <el-radio label="color5">
          <span class="colorSpan" style="background:#997b71"></span>
        </el-radio>
        <el-radio label="color6">
          <span class="colorSpan" style="background:#9463f7"></span>
        </el-radio>
        <!-- <el-radio label="color7">
          <span class="colorSpan" style="background:#757575"></span>
        </el-radio>
        <el-radio label="color8">
          <span class="colorSpan" style="background:#eb6709"></span>
        </el-radio>
        <el-radio label="color9">
          <span class="colorSpan" style="background:#f74584"></span>
        </el-radio>
        <el-radio label="color10">
          <span class="colorSpan" style="background:#fcb900"></span>
        </el-radio>
        <el-radio label="color11">
          <span class="colorSpan" style="background:#ff4c52"></span>
        </el-radio> -->
      </el-radio-group>
    </el-form-item>

  </el-form>
</template>

<script>
  export default {
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType },
        set (val) { this.$store.commit('common/updateNavbarLayoutType', val) }
      },
      navbarLayoutColor: {
        get () { return this.$store.state.common.navbarLayoutColor },
        set (val) { this.$store.commit('common/updateNavbarLayoutColor', val) }
      },
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin },
        set (val) { this.$store.commit('common/updateSidebarLayoutSkin', val) }
      },
      sidebarLayoutSkinColor: {
        get () { return this.$store.state.common.sidebarLayoutSkinColor },
        set (val) { this.$store.commit('common/updateSidebarLayoutSkinColor', val) }
      }
    }
  }
</script>
<style>
  .colorSpan{
    display: inline-block;
    width: 13px;
    height: 13px;
    border-radius: 2px;
  }
</style>
