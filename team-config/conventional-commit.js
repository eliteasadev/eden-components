#!/usr/bin/env node
import { confirm, input, select } from '@inquirer/prompts'
import { exec } from 'child_process'

async function commit () {
  const type = await select({
    message: '¿Qué tipo de cambio quieres realizar?',
    loop: false,
    choices: [
      { name: 'feat:  Una nueva característica', value: 'feat' },
      { name: 'fix:  Una corrección de errores', value: 'fix' },
      { name: 'docs:  Cambios en la documentación', value: 'docs' },
      {
        name: 'style:  Cambios que no afectan la lógica del código (espacios en blanco, formato, etc.)',
        value: 'style'
      },
      {
        name: 'refactor:  Cambios en el código que no corrigen errores ni añaden características',
        value: 'refactor'
      },
      { name: 'perf:  Cambios que mejoran el rendimiento', value: 'perf' },
      {
        name: 'test:  Añadir pruebas faltantes o corregir pruebas existentes',
        value: 'test'
      },
      {
        name: 'chore:  Cambios en el proceso de construcción o herramientas auxiliares',
        value: 'chore'
      }
    ]
  })

  const scope = await input({
    message: '¿Cuál es el ámbito del cambio? (opcional)'
  })

  const description = await input({
    message: '¿Cuál es la descripción del cambio?'
  })

  const footer = await input({
    message: '¿Hay algún pie de página? (opcional)'
  })

  const commitMessage = `${type}${scope ? `(${scope})` : ''}: ${description}${
    footer ? `\n\n${footer}` : ''
  }`

  const confirmCommit = await confirm({
    message: '¿Confirmas que quieres realizar el commit?',
    name: 'confirmCommit',
    default: false
  })

  if (confirmCommit) {
    // Ejecutar el comando de commit
    exec(`git commit -m "${commitMessage}"`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error al realizar el commit: ${stderr}`)
        return
      }
      console.log(`Commit realizado: ${stdout}`)
    })
  } else {
    console.log('Commit cancelado')
  }
}

commit().catch((error) => {
  console.error('Error:', error)
})
