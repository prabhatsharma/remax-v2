<template>
<div>
    <!-- SignIn page {{authState}} - {{user}} -->
    <home/>

    
</div>
</template>

<script>
import Home from '../views/Home'

export default {
    components: {
        Home
    },
    data() {
        return {
        user: undefined,
        authState: undefined
        }
    }
}
</script>

<style scoped>

</style>
