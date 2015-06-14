#!/bin/bash
du output/ -sh | sed 's/\s//g' | sed 's:output/::g'
