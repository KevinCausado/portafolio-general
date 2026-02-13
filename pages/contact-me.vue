<template>
    <main id="contact-me" class="page">

        <div id="mobile-page-title">
            <h2>_contacto</h2>
        </div>

        <div id="page-menu" class="w-full h-full flex flex-col border-right">

            <!-- contacts -->
            <div id="contacts" class="submenu">
                <div class="title" @click="open('contacts')">
                    <img class="arrow" src="/icons/arrow.svg" alt="">
                    <h3>
                        contacto
                    </h3>
                </div>
                <div id="links">
                    <div v-for="(source, key) in contact.direct.sources" :key="key" class="link">
                        <img :src="baseURL + 'icons/' + key + '.svg'" alt="">
                        <a v-html="source" href="/" class="font-fira_retina text-menu-text hover:text-white"></a>
                    </div>
                </div>
            </div>

            <!-- whatsapp -->
            <div id="whatsapp" class="submenu border-top">
                <div class="title" @click="open('whatsapp')">
                    <img class="arrow" src="/icons/arrow.svg" alt="">
                    <h3>
                        whatsapp
                    </h3>
                </div>
                <div id="links">
                    <div class="link">
                        <img :src="baseURL + 'icons/phone.svg'" alt="">
                        <a href="https://wa.me/573152089391" target="_blank" rel="noopener noreferrer" class="font-fira_retina text-menu-text hover:text-white">Enviar mensaje</a>
                    </div>
                </div>
            </div>

        </div>
            
        <div class="flex flex-col w-full">

        <!-- windows tab -->
        <div class="tab-height w-full hidden lg:flex border-right border-bot items-center">

                <div class="flex items-center border-right h-full">
                    <p class="font-fira_regular text-menu-text text-sm px-3">contacto</p>
                    <img src="/icons/close.svg" alt="" class="m-3">
                </div>

            </div>

            <!-- main -->
            <div class="flex lg:grid lg:grid-cols-2 h-full w-full">
        
                <div id="left" class="h-full w-full flex flex-col border-right items-center">
                    
                    <ContactForm v-model:name="name" v-model:email="email" v-model:message="message" />

                </div>

                <div id="right" class="h-full w-full hidden lg:flex">

                    <div class="form-content">
                        <FormContentCode :name="name" :email="email" :message="message" />
                    </div>
                    <!-- scroll bar -->
                    <div id="scroll-bar" class="h-full border-left flex justify-center py-1">
                        <div id="scroll"></div>
                    </div>
                
                </div>
            </div>

        </div>
    </main>
</template>

<script>
import DevConfig from '~/developer.json';
export default {
    data() {
        return {
            name: '',
            email: '',
            message: '',
        }
    },
    setup() {
        useHead({ title: 'Contacto | Kevin Causado' })
        const runtimeConfig = useRuntimeConfig()
        return {
            contact: DevConfig.contacts,
            baseURL: runtimeConfig.app.baseURL || '/',
        }
    },
    methods: {
        open(elementId) {
            const element = document.getElementById(elementId);
            const arrow = element.querySelector('.arrow');
            const links = element.querySelector('#links');

            if (links.style.display === 'block') {
                links.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            } else {
                links.style.display = 'block';
                arrow.style.transform = 'rotate(90deg)';
            }
        }
    },
    mounted(){
        const links = document.getElementsByClassName('submenu');
        for (let i = 0; i < links.length; i++) {
            if(window.innerWidth > 1024){
                links[i].querySelector("#links").style.display = "block";
                links[i].querySelector(".arrow").style.transform = "rotate(90deg)";
            } else {
                links[i].querySelector("#links").style.display = "none";
            }
        }
    },
}
</script>

<style>

.arrow {
    transition: 0.1s;
    margin-right: 10px;
    width: 9px;
    height: 9px;
}

.submenu {
    display: flex;
    flex-direction: column;
}

.submenu .title h3 {
    @apply font-fira_regular;
    color: white;
    font-size: 16px;
}

.link {
    display: flex;
    align-items: center;
    padding: 4px 25px;
}

.link img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
}

#links {
    padding: 10px 0px;
}

.form-content {
    padding: 75px 50px 0px 75px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    font-size: 15px;
}
@media (min-width: 1024px) {
    
    .submenu .title {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #1E2D3D;
        padding: 0px 25px;
        height: 35px;
        padding: 0px 25px;
    }
    .submenu .title:hover {
        cursor: pointer;
    }
    .submenu .title h3 {
        font-size: 14px;
    }
}

</style>