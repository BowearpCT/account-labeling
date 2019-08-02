<template>
    <div>
        <b-row >
            <b-col cols="12">
                <b-img src="https://marketingmagazine.com.my/wp-content/uploads/2018/09/wisesight6.png"
                fluid alt=""
                >
                </b-img>
            </b-col>
        </b-row>
        <b-form @submit.stop.prevent>
            <b-row>
                <b-col>
                    <b-form-group
                        id="fieldset-horizontal"
                        description=""
                        label-align-md="left"
                        label-cols-lg="3"
                        label="username"
                        label-for="input-horizontal"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                        >
                        <b-form-input type="text" id="input-horizontal" required v-model="name" :state="state" trim></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group
                        id="fieldset-horizontal"
                        description=""
                        label-align-md="left"
                        label-cols-lg="3"
                        label="password"
                        label-for="input-horizontal"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                        >
                        <b-form-input id="input-horizontal" type="password" required v-model="name" :state="state" trim>
                        </b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="9">
                    <b-button type="submit" size="md" variant="danger">Login</b-button> 
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>