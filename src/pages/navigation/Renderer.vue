<template>
  <q-page v-bind:class="pageClasses">
    <div
      v-html="pageContent"
      v-if="pageContent"
    >
    </div>
    <div v-if="isPdf">
      <!-- class="container q-pa-lg" -->
      <q-pdfviewer
        v-model="show"
        :src="srcPdf"
        content-class="absolute"
      />
    </div>
    <!-- debug
    <p>This is page {{page.Title}} with _id: {{page._id}}</p>
    <router-link to="/wrong">Wrong</router-link>
    <router-link to="/test_selection">Test Selection</router-link>
    <router-link to="/selection/selection">Selection</router-link>
    <p>Look: {{long}}</p>
     -->
  </q-page>
</template>

<script>
import navigationService from '../../services/navigation/navigationService'

export default {
  name: 'RendererPage',
  data () {
    return {
      pageContent: undefined,
      path: undefined,
      long: '',
      show: true,
      isPdf: false,
      srcPdf: ''
    }
  },
  computed: {
    pageClasses: function () {
      let classes = []
      if (this.$config.staticBoxedLayout) {
        classes.push('boxed-page')
      }
      if (this.$config.staticPagePadding) {
        classes.push('q-pa-md')
      }
      return classes
    }
  },
  watch: {
    path: function () {
      if (this.path) {
        let that = this
        if (navigationService.isPage(that.path)) {
          navigationService.loadPage(that.path, content => {
            that.pageContent = content
          })
        }
        if (navigationService.isPdf(that.path)) {
          that.srcPdf = 'statics' + that.path
          that.isPdf = true
        }
      }
    }
  },
  mounted () {
    this.path = this.$route.path
    /* this.long = 'path: ' + this.$route.path + ' - fullPath: ' + this.$route.fullPath + ' - params: ' + JSON.stringify(this.$route.params) */
  },
  beforeRouteEnter (to, from, next) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    navigationService.wrongPage(to.path, result => {
      if (result) {
        next({ path: '/notfound', replace: true })
      } else {
        next()
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:id`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
    let that = this
    navigationService.wrongPage(to.path, result => {
      if (result) {
        next({ path: '/notfound', replace: true })
      } else {
        that.path = to.path
        next()
      }
    })
  }
}
</script>

<style>
.boxed-page {
  padding: 16px 46px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.container {
  max-width: 100%;
  max-height: 70%;
  min-width: 400px;
  min-height: 600px;
  width: 100%;
  height: 100%;
}
</style>
