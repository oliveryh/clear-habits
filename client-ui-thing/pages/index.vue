<template>
  <div class="flex h-screen items-center justify-center">
    <form @submit="onSubmit">
      <UiCard class="w-[360px] max-w-sm" header="Login" headerClass="text-center">
        <template #content>
          <UiCardContent>
            <fieldset :disabled="isSubmitting" class="space-y-5">
              <UiVeeInput label="Email" name="email" type="email" />
              <UiVeeInput label="Password" name="password" type="password" />
              <UiButton type="submit">Submit</UiButton>
            </fieldset>
          </UiCardContent>
        </template>
      </UiCard>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod"

  const { onLogin } = useApollo()

  const loginMutation = gql`
    mutation ($email: String!, $password: String!) {
      signIn(input: { email: $email, password: $password }) {
        jwtToken
      }
    }
  `

  const schema = z.object({
    email: z.string({ required_error: "Required" }).email("Please enter a valid email"),
    password: z
      .string({ required_error: "Required" })
      .min(8, "Password must be at least 8 characters"),
  })

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  })

  const onSubmit = handleSubmit(async (values) => {
    const { mutate } = useMutation(loginMutation)
    const submit = await mutate(values)
    if (submit?.data?.signIn.jwtToken) {
      onLogin(submit?.data.signIn.jwtToken)
      const router = useRouter()
      router.push("/tasks")
    } else {
      useSonner.error("Invalid email or password", { position: "bottom-center" })
    }
  })
</script>
