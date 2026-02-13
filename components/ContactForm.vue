<template>
    <form id="contact-form" class="text-sm" @submit.prevent="submitForm">
        <input type="hidden" name="access_key" :value="accessKey">
        <div class="flex flex-col">
            <label for="name-input" class="mb-3">_nombre:</label>
            <input type="text" id="name-input" name="name" v-model="formName" placeholder="Kevin Causado" class="p-2 mb-5 placeholder-slate-600" required>
        </div>
        <div class="flex flex-col">
            <label for="email-input" class="mb-3">_email:</label>
            <input type="email" id="email-input" name="email" v-model="formEmail" placeholder="email@ejemplo.com" class="p-2 mb-5 placeholder-slate-600" required>
        </div>
        <div class="flex flex-col">
            <label for="message-input" class="mb-3">_mensaje:</label>
            <textarea id="message-input" name="message" v-model="formMessage" placeholder="Escribe tu mensaje..." class="placeholder-slate-600" required></textarea>
        </div>
        <button id="submit-button" type="submit" class="py-2 px-4" :disabled="sending">
          {{ sending ? 'enviando...' : 'enviar-mensaje' }}
        </button>

        <p v-if="statusMessage" class="mt-3 text-sm" :class="statusOk ? 'text-greenfy' : 'text-red-400'">
          {{ statusMessage }}
        </p>
    </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
})

const emit = defineEmits(['update:name', 'update:email', 'update:message'])

const accessKey = ref('TU_ACCESS_KEY_AQUI') // Reemplazar con tu API key de https://web3forms.com
const formName = ref('')
const formEmail = ref('')
const formMessage = ref('')
const sending = ref(false)
const statusMessage = ref('')
const statusOk = ref(false)

watch(formName, (val) => emit('update:name', val))
watch(formEmail, (val) => emit('update:email', val))
watch(formMessage, (val) => emit('update:message', val))

async function submitForm() {
  sending.value = true
  statusMessage.value = ''

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey.value,
        name: formName.value,
        email: formEmail.value,
        message: formMessage.value,
        subject: `Nuevo mensaje de ${formName.value} desde tu portafolio`,
      })
    })

    const data = await response.json()

    if (data.success) {
      statusOk.value = true
      statusMessage.value = 'Mensaje enviado correctamente.'
      formName.value = ''
      formEmail.value = ''
      formMessage.value = ''
    } else {
      statusOk.value = false
      statusMessage.value = 'Error al enviar. Intenta de nuevo.'
    }
  } catch {
    statusOk.value = false
    statusMessage.value = 'Error de conexión. Intenta de nuevo.'
  } finally {
    sending.value = false
  }
}
</script>

<style>

form {
    @apply font-fira_retina text-menu-text
}
input {
    background-color: #011221;
    border: 2px solid #1E2D3D;
    border-radius: 7px;
    
}
/* Change Autocomplete styles in Chrome*/
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: rgb(190, 190, 190);
  transition: background-color 5000s ease-in-out 0s;
  border: 2px solid #607b96;
}

#message-input {
    background-color: #011221;
    border: 2px solid #1E2D3D;
    border-radius: 7px;
    resize: none;
    height: 150px;
    padding: 10px;
}

#submit-button {
    @apply font-fira_retina text-white text-sm;
    background-color: #1E2D3D;
    border-radius: 7px;
    margin-top: 20px;
    cursor: pointer;
}

#submit-button:hover {
    background-color: #263B50;
}

input:focus, #message-input:focus {
    outline: none;
    transition: none;
    border: 2px solid #607b96;
    box-shadow: #607b9669 0px 0px 0px 2px;
  }

#contact-form {
    max-width: 370px;
    width: 100%;
}

@media (max-width: 1920px) {
    #contact-form {
        max-width: 320px;
        max-height: 400px;
    }
    #submit-button {
        /* width: 100%; */
        font-size: 12px;
    }
    textarea {
        font-size: 13px;
        max-height: 130px !important;
    }
    input {
        font-size: 13px;
    }
}
</style>