import authApi from "@/api/authApi"

export const createUser = async ({ commit }, user) => {

    const { name, email, password } = user

    console.log(commit)

    try {

        const { data } = await authApi.post(':signUp', { email, password, returnSecureToken: true })
        const { idToken } = data

        const resp = await authApi.post(':update', { displayName: name, idToken })
        console.log(resp)

        return { ok: true}

    } catch (error) {
        console.log(error.response)
        return { ok: false, message: error.response.data.error.message }
    }

}

// export const myAction = async ({ commit }) => {

// }