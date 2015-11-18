# wres: resume webpage generator
[![npm](https://img.shields.io/npm/v/wres.svg)](https://www.npmjs.com/package/wres)  [![Travis](https://img.shields.io/travis/CmStar283/wres.svg)](https://travis-ci.org/CmStar283/wres)  [![Coveralls](https://img.shields.io/coveralls/CmStar283/wres.svg)](https://coveralls.io/github/CmStar283/wres) [![npm](https://img.shields.io/npm/l/wres.svg)](https://www.apache.org/licenses/LICENSE-2.0)

[![NPM](https://nodei.co/npm/wres.png)](https://nodei.co/npm/wres/)

## install
With [npm](https://www.npmjs.com/package/npm) do:
``` sh
npm i -g wres
```

## usage
```
usage: wres [-h] [-v] [-d DENSITY] [-f FORMAT] [-o OUTPUT] [-p]
            [--print-template] [-t THEME] [--list-themes]
            [resume]

Resume webpage generator

Positional arguments:
  resume                YAML or JSON file containing the resume information

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -d DENSITY, --density DENSITY
                        Use the alternative, compact template.
  -f FORMAT, --format FORMAT
                        Specify an external Jade template to use (not
                        recommended).
  -o OUTPUT, --output OUTPUT
                        Specify output file.
  -p, --pretty          Output pretty HTML.
  --print-template      Print the template resume and exit.
  -t THEME, --theme THEME
                        Specify a pre-defined or external CSS theme.
  --list-themes         List pre-defined themes.
```

## getting started
To start, copy the template resume (also shown below):
``` sh
wres --print-template -o resume.yml
```
To generate the resume:
``` sh
wres -o resume.html resume.yml
```

## template resume
``` yaml
address:
  school: |
    Address 1
    Address 2
    City, State, Zip Code
  permanent: |
    Address 1
    Address 2
    City, State, Zip Code
name: Tom Plate
email: email@example.com
phone: +1 (555) 555-5555
sections:
  -
    title: Objective
    description: Template description.
  -
    title: Education
    items:
      -
        title: Template University
        date: Start date-End date
        location: Location
        description: Template description.
      -
        title: Template High School
        date: Start date-End date
        location: Location
        description: Template description.
  -
    title: Experience
    bullet_items:
      -
        title: Template Experience 1
        date: Date
        location: Location
      -
        title: Template Experience 2
        date: Date
        location: Location
  -
    title: Template Section
    items:
      -
        title: Best Template Award
        date: Date
        location: Location
        description: Template description.
referencesUponRequest: true
```

## changelog
See the [release page](https://github.com/CmStar283/wres/releases).
