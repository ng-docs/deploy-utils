import {Octokit} from '@octokit/rest';
import {GITHUB_TOKEN} from './secret/github-token';

export const github = new Octokit({auth: GITHUB_TOKEN});