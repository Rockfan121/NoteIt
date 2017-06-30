Frontend
========

Generowanie testów:

    `react-testgen -i 'src' -o 'react-testgen-tests'`

Opcja `--no-overwrite` zapobiega nadpisaniu istniejących plików

Uruchomienie testów:

    `find ./react-testgen-tests -name '*.js' -exec node {} \;`
