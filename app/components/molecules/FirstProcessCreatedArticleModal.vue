<template>
  <div class="modal-body">
    <div class="wrapper">
      <p class="description">
        はじめての記事投稿<span class="br" />お疲れ様でした！<br>
        記事にいいねがつき、<span class="br" />ALISを獲得するのを<span class="br" />待ちましょう。
      </p>
      <app-button class="submit" @click="submit">
        <nuxt-link to="/">
          トップに戻る
        </nuxt-link>
      </app-button>
      <app-button class="close" type="secondary" @click="close">
        閉じる
      </app-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppButton from '../atoms/AppButton'

export default {
  components: {
    AppButton
  },
  mounted() {
    this.putFirstProcessCreatedArticle()
  },
  methods: {
    submit() {
      this.close()
    },
    close() {
      this.setFirstProcessModal({ isShow: false })
      this.setFirstProcessCreatedArticleModal({ isShow: false })
    },
    ...mapActions('user', [
      'setFirstProcessModal',
      'setFirstProcessCreatedArticleModal',
      'putFirstProcessCreatedArticle'
    ])
  }
}
</script>

<style lang="scss" scoped>
.modal-body {
  margin: 0 auto;
  display: flex;
}

.wrapper {
  width: 100vw;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background: url('~assets/images/pc/bg/first-process-created-article.png') no-repeat;
  background-size: auto 280px;
  background-position-x: center;
  margin: -50px -30px 0;
  height: 100%;

  .description {
    color: #030303;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 1.37px;
    line-height: 1.5;
    margin: 310px 0 0;
    padding: 0 30px;
  }

  .submit {
    margin: 40px 0 0;
  }

  .close {
    margin: 20px 0 60px;
    font-weight: bold;
  }
}

@media screen and (max-width: 550px) {
  .br {
    &:before {
      content: '\A';
      white-space: pre;
    }
  }

  .wrapper {
    background-size: auto 320px;

    .description {
      font-size: 20px;
      margin: 340px 0 0;
      padding: 0;
    }

    .submit {
      margin: 30px auto 0;
    }
  }
}

@media screen and (max-width: 320px) {
  .wrapper {
    background-size: auto 240px;

    .description {
      font-size: 18px;
      margin: 260px 0 0;
    }
  }
}
</style>
