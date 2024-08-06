import { exec } from 'child_process'
import inquirer from 'inquirer'

const questions = [
  {
    type: 'list',
    name: 'type',
    message: '¿Qué tipo de cambio estás realizando?',
    loop: false,
    choices: [
      { name: 'feat:  Una nueva característica', value: 'feat' },
      { name: 'fix:  Una corrección de errores', value: 'fix' },
      { name: 'docs:  Cambios en la documentación', value: 'docs' },
      { name: 'style:  Cambios que no afectan la lógica del código (espacios en blanco, formato, etc.)', value: 'style' },
      { name: 'refactor:  Cambios en el código que no corrigen errores ni añaden características', value: 'refactor' },
      { name: 'perf:  Cambios que mejoran el rendimiento', value: 'perf' },
      { name: 'test:  Añadir pruebas', value: 'test' },
      { name: 'chore:  Cambios en el proceso de construcción o herramientas auxiliares', value: 'chore' }
    ]
  },
  {
    type: 'input',
    name: 'scope',
    message: '¿Cuál es el alcance del cambio (opcional)?',
    default: ''
  },
  {
    type: 'input',
    name: 'description',
    message: '¿Cuál es la descripción breve del cambio?'
  },
  {
    type: 'input',
    name: 'footer',
    message: '¿Hay algún pie de página o nota adicional? (opcional)',
    default: ''
  }
]

inquirer.prompt(questions).then(answers => {
  const { type, scope, description, footer } = answers
  const scopePart = scope ? `(${scope})` : ''
  const footerPart = footer ? `\n\n${footer}` : ''
  const commitMessage = `${type}${scopePart}: ${description}${footerPart}`

  // Ejecutar el comando de commit
  exec(`git commit -m "${commitMessage}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error al realizar el commit: ${stderr}`)
      return
    }
    console.log(`Commit realizado: ${stdout}`)
  })
})
